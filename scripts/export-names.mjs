/** Explicit package exports shared by the source-entry check and declaration facade generation. */

/**
 * Read final public names without following or expanding any wildcard reexports.
 * @param {object} ts The SDK's installed TypeScript compiler.
 * @param {string} text Source or declaration entry content.
 * @param {string} filename Entry filename used in validation errors.
 * @returns {{types: string[], values: string[]}} Sorted type-only and value export names.
 */
export function collectNamedExports(ts, text, filename) {
  const source = ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, true);
  if (source.parseDiagnostics.length) throw new Error(`Invalid package entry: ${filename}`);
  const types = new Set();
  const values = new Set();
  const seen = new Set();
  const add = (name, typeOnly) => {
    if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) || name === 'default') {
      throw new Error(`Package entry requires an explicit identifier export: ${filename}#${name}`);
    }
    if (seen.has(name)) throw new Error(`Duplicate package export: ${filename}#${name}`);
    seen.add(name);
    (typeOnly ? types : values).add(name);
  };
  for (const statement of source.statements) {
    if (!ts.isExportDeclaration(statement)) {
      if (ts.isExportAssignment(statement) || statement.modifiers?.some(item => item.kind === ts.SyntaxKind.ExportKeyword)) {
        throw new Error(`Package entry must use explicit named reexports: ${filename}`);
      }
      continue;
    }
    if (!statement.exportClause) throw new Error(`Wildcard package exports are not allowed: ${filename}`);
    if (ts.isNamespaceExport(statement.exportClause)) {
      add(statement.exportClause.name.text, statement.isTypeOnly);
    } else {
      for (const item of statement.exportClause.elements) add(item.name.text, statement.isTypeOnly || item.isTypeOnly);
    }
  }
  if (!seen.size) throw new Error(`Package entry must declare explicit public exports: ${filename}`);
  return { types: [...types].sort(), values: [...values].sort() };
}

/**
 * Reexport already-resolved public names from one module while retaining type-only boundaries.
 * @param {{types: string[], values: string[]}} names Final names on the source module.
 * @param {string} module Module supplying those names to the facade.
 * @param {number} [width] Approximate maximum line length for generated named lists.
 * @returns {string} Explicit type and value reexport declarations.
 */
export function renderNamedExports(names, module, width = 100) {
  const groups = [];
  for (const [kind, values] of [['type ', names.types], ['', names.values]]) {
    if (!values.length) continue;
    const lines = [];
    let line = '  ';
    for (const name of values) {
      const entry = `${name},`;
      if (line.length > 2 && line.length + entry.length + 1 > width) {
        lines.push(line.trimEnd());
        line = '  ';
      }
      line += `${entry} `;
    }
    if (line.trim()) lines.push(line.trimEnd());
    groups.push(`export ${kind}{\n${lines.join('\n')}\n} from '${module}';`);
  }
  return groups.join('\n') + '\n';
}
