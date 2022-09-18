// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/promise-function-async */

import { default as memo } from 'memoize-one';

const queue = (arr: Array<() => Promise<any>>) => {
  let promise = Promise.resolve();

  arr.forEach((chain) => {
    promise = promise.then(chain);
  });

  return promise;
};

export const languages: Readonly<Record<string, () => Promise<any>>> = {
  'abap': memo(() => queue([
    () => import('prismjs/components/prism-abap.min.js')
  ])),
  'abnf': memo(() => queue([
    () => import('prismjs/components/prism-abnf.min.js')
  ])),
  'actionscript': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-actionscript.min.js')
  ])),
  'ada': memo(() => queue([
    () => import('prismjs/components/prism-ada.min.js')
  ])),
  'agda': memo(() => queue([
    () => import('prismjs/components/prism-agda.min.js')
  ])),
  'al': memo(() => queue([
    () => import('prismjs/components/prism-al.min.js')
  ])),
  'antlr4': memo(() => queue([
    () => import('prismjs/components/prism-antlr4.min.js')
  ])),
  'apacheconf': memo(() => queue([
    () => import('prismjs/components/prism-apacheconf.min.js')
  ])),
  'apex': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-sql.min.js'),
    () => import('prismjs/components/prism-apex.min.js')
  ])),
  'apl': memo(() => queue([
    () => import('prismjs/components/prism-apl.min.js')
  ])),
  'applescript': memo(() => queue([
    () => import('prismjs/components/prism-applescript.min.js')
  ])),
  'aql': memo(() => queue([
    () => import('prismjs/components/prism-aql.min.js')
  ])),
  'arduino': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-c.min.js'),
    () => import('prismjs/components/prism-cpp.min.js'),
    () => import('prismjs/components/prism-arduino.min.js')
  ])),
  'arff': memo(() => queue([
    () => import('prismjs/components/prism-arff.min.js')
  ])),
  'armasm': memo(() => queue([
    () => import('prismjs/components/prism-armasm.min.js')
  ])),
  'arturo': memo(() => queue([
    () => import('prismjs/components/prism-arturo.min.js')
  ])),
  'asciidoc': memo(() => queue([
    () => import('prismjs/components/prism-asciidoc.min.js')
  ])),
  'asm6502': memo(() => queue([
    () => import('prismjs/components/prism-asm6502.min.js')
  ])),
  'asmatmel': memo(() => queue([
    () => import('prismjs/components/prism-asmatmel.min.js')
  ])),
  'aspnet': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-csharp.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-aspnet.min.js')
  ])),
  'autohotkey': memo(() => queue([
    () => import('prismjs/components/prism-autohotkey.min.js')
  ])),
  'autoit': memo(() => queue([
    () => import('prismjs/components/prism-autoit.min.js')
  ])),
  'avisynth': memo(() => queue([
    () => import('prismjs/components/prism-avisynth.min.js')
  ])),
  'avro-idl': memo(() => queue([
    () => import('prismjs/components/prism-avro-idl.min.js')
  ])),
  'awk': memo(() => queue([
    () => import('prismjs/components/prism-awk.min.js')
  ])),
  'bash': memo(() => queue([
    () => import('prismjs/components/prism-bash.min.js')
  ])),
  'basic': memo(() => queue([
    () => import('prismjs/components/prism-basic.min.js')
  ])),
  'batch': memo(() => queue([
    () => import('prismjs/components/prism-batch.min.js')
  ])),
  'bbcode': memo(() => queue([
    () => import('prismjs/components/prism-bbcode.min.js')
  ])),
  'bbj': memo(() => queue([
    () => import('prismjs/components/prism-bbj.min.js')
  ])),
  'bicep': memo(() => queue([
    () => import('prismjs/components/prism-bicep.min.js')
  ])),
  'birb': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-birb.min.js')
  ])),
  'bison': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-c.min.js'),
    () => import('prismjs/components/prism-bison.min.js')
  ])),
  'bnf': memo(() => queue([
    () => import('prismjs/components/prism-bnf.min.js')
  ])),
  'bqn': memo(() => queue([
    () => import('prismjs/components/prism-bqn.min.js')
  ])),
  'brainfuck': memo(() => queue([
    () => import('prismjs/components/prism-brainfuck.min.js')
  ])),
  'brightscript': memo(() => queue([
    () => import('prismjs/components/prism-brightscript.min.js')
  ])),
  'bro': memo(() => queue([
    () => import('prismjs/components/prism-bro.min.js')
  ])),
  'bsl': memo(() => queue([
    () => import('prismjs/components/prism-bsl.min.js')
  ])),
  'c': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-c.min.js')
  ])),
  'cfscript': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-cfscript.min.js')
  ])),
  'chaiscript': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-c.min.js'),
    () => import('prismjs/components/prism-cpp.min.js'),
    () => import('prismjs/components/prism-chaiscript.min.js')
  ])),
  'cil': memo(() => queue([
    () => import('prismjs/components/prism-cil.min.js')
  ])),
  'cilkc': memo(() => queue([
    () => import('prismjs/components/prism-cilkc.min.js')
  ])),
  'cilkcpp': memo(() => queue([
    () => import('prismjs/components/prism-cilkcpp.min.js')
  ])),
  'clike': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js')
  ])),
  'clojure': memo(() => queue([
    () => import('prismjs/components/prism-clojure.min.js')
  ])),
  'cmake': memo(() => queue([
    () => import('prismjs/components/prism-cmake.min.js')
  ])),
  'cobol': memo(() => queue([
    () => import('prismjs/components/prism-cobol.min.js')
  ])),
  'coffeescript': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-coffeescript.min.js')
  ])),
  'concurnas': memo(() => queue([
    () => import('prismjs/components/prism-concurnas.min.js')
  ])),
  'cooklang': memo(() => queue([
    () => import('prismjs/components/prism-cooklang.min.js')
  ])),
  'coq': memo(() => queue([
    () => import('prismjs/components/prism-coq.min.js')
  ])),
  'cpp': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-c.min.js'),
    () => import('prismjs/components/prism-cpp.min.js')
  ])),
  'crystal': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-ruby.min.js'),
    () => import('prismjs/components/prism-crystal.min.js')
  ])),
  'csharp': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-csharp.min.js')
  ])),
  'cshtml': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-csharp.min.js'),
    () => import('prismjs/components/prism-cshtml.min.js')
  ])),
  'csp': memo(() => queue([
    () => import('prismjs/components/prism-csp.min.js')
  ])),
  'css-extras': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-css.min.js'),
    () => import('prismjs/components/prism-css-extras.min.js')
  ])),
  'css': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-css.min.js')
  ])),
  'csv': memo(() => queue([
    () => import('prismjs/components/prism-csv.min.js')
  ])),
  'cue': memo(() => queue([
    () => import('prismjs/components/prism-cue.min.js')
  ])),
  'cypher': memo(() => queue([
    () => import('prismjs/components/prism-cypher.min.js')
  ])),
  'd': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-d.min.js')
  ])),
  'dart': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-dart.min.js')
  ])),
  'dataweave': memo(() => queue([
    () => import('prismjs/components/prism-dataweave.min.js')
  ])),
  'dax': memo(() => queue([
    () => import('prismjs/components/prism-dax.min.js')
  ])),
  'dhall': memo(() => queue([
    () => import('prismjs/components/prism-dhall.min.js')
  ])),
  'diff': memo(() => queue([
    () => import('prismjs/components/prism-diff.min.js')
  ])),
  'django': memo(() => queue([
    () => import('prismjs/components/prism-django.min.js')
  ])),
  'dns-zone-file': memo(() => queue([
    () => import('prismjs/components/prism-dns-zone-file.min.js')
  ])),
  'docker': memo(() => queue([
    () => import('prismjs/components/prism-docker.min.js')
  ])),
  'dot': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-dot.min.js')
  ])),
  'ebnf': memo(() => queue([
    () => import('prismjs/components/prism-ebnf.min.js')
  ])),
  'editorconfig': memo(() => queue([
    () => import('prismjs/components/prism-editorconfig.min.js')
  ])),
  'eiffel': memo(() => queue([
    () => import('prismjs/components/prism-eiffel.min.js')
  ])),
  'ejs': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-ejs.min.js')
  ])),
  'elixir': memo(() => queue([
    () => import('prismjs/components/prism-elixir.min.js')
  ])),
  'elm': memo(() => queue([
    () => import('prismjs/components/prism-elm.min.js')
  ])),
  'erb': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-ruby.min.js'),
    () => import('prismjs/components/prism-erb.min.js')
  ])),
  'erlang': memo(() => queue([
    () => import('prismjs/components/prism-erlang.min.js')
  ])),
  'etlua': memo(() => queue([
    () => import('prismjs/components/prism-lua.min.js'),
    () => import('prismjs/components/prism-etlua.min.js')
  ])),
  'excel-formula': memo(() => queue([
    () => import('prismjs/components/prism-excel-formula.min.js')
  ])),
  'factor': memo(() => queue([
    () => import('prismjs/components/prism-factor.min.js')
  ])),
  'false': memo(() => queue([
    () => import('prismjs/components/prism-false.min.js')
  ])),
  'firestore-security-rules': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-firestore-security-rules.min.js')
  ])),
  'flow': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-flow.min.js')
  ])),
  'fortran': memo(() => queue([
    () => import('prismjs/components/prism-fortran.min.js')
  ])),
  'fsharp': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-fsharp.min.js')
  ])),
  'ftl': memo(() => queue([
    () => import('prismjs/components/prism-ftl.min.js')
  ])),
  'gap': memo(() => queue([
    () => import('prismjs/components/prism-gap.min.js')
  ])),
  'gcode': memo(() => queue([
    () => import('prismjs/components/prism-gcode.min.js')
  ])),
  'gdscript': memo(() => queue([
    () => import('prismjs/components/prism-gdscript.min.js')
  ])),
  'gedcom': memo(() => queue([
    () => import('prismjs/components/prism-gedcom.min.js')
  ])),
  'gettext': memo(() => queue([
    () => import('prismjs/components/prism-gettext.min.js')
  ])),
  'gherkin': memo(() => queue([
    () => import('prismjs/components/prism-gherkin.min.js')
  ])),
  'git': memo(() => queue([
    () => import('prismjs/components/prism-git.min.js')
  ])),
  'glsl': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-c.min.js'),
    () => import('prismjs/components/prism-glsl.min.js')
  ])),
  'gml': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-gml.min.js')
  ])),
  'gn': memo(() => queue([
    () => import('prismjs/components/prism-gn.min.js')
  ])),
  'go-module': memo(() => queue([
    () => import('prismjs/components/prism-go-module.min.js')
  ])),
  'go': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-go.min.js')
  ])),
  'gradle': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-gradle.min.js')
  ])),
  'graphql': memo(() => queue([
    () => import('prismjs/components/prism-yaml.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-markdown.min.js'),
    () => import('prismjs/components/prism-graphql.min.js')
  ])),
  'groovy': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-groovy.min.js')
  ])),
  'haml': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-ruby.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-haml.min.js')
  ])),
  'handlebars': memo(() => queue([
    () => import('prismjs/components/prism-handlebars.min.js')
  ])),
  'haskell': memo(() => queue([
    () => import('prismjs/components/prism-haskell.min.js')
  ])),
  'haxe': memo(() => queue([
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-haxe.min.js')
  ])),
  'hcl': memo(() => queue([
    () => import('prismjs/components/prism-hcl.min.js')
  ])),
  'hlsl': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-c.min.js'),
    () => import('prismjs/components/prism-hlsl.min.js')
  ])),
  'hoon': memo(() => queue([
    () => import('prismjs/components/prism-hoon.min.js')
  ])),
  'hpkp': memo(() => queue([
    () => import('prismjs/components/prism-hpkp.min.js')
  ])),
  'hsts': memo(() => queue([
    () => import('prismjs/components/prism-hsts.min.js')
  ])),
  'http': memo(() => queue([
    () => import('prismjs/components/prism-uri.min.js'),
    () => import('prismjs/components/prism-csp.min.js'),
    () => import('prismjs/components/prism-hpkp.min.js'),
    () => import('prismjs/components/prism-hsts.min.js'),
    () => import('prismjs/components/prism-http.min.js')
  ])),
  'ichigojam': memo(() => queue([
    () => import('prismjs/components/prism-ichigojam.min.js')
  ])),
  'icon': memo(() => queue([
    () => import('prismjs/components/prism-icon.min.js')
  ])),
  'icu-message-format': memo(() => queue([
    () => import('prismjs/components/prism-icu-message-format.min.js')
  ])),
  'idris': memo(() => queue([
    () => import('prismjs/components/prism-haskell.min.js'),
    () => import('prismjs/components/prism-idris.min.js')
  ])),
  'iecst': memo(() => queue([
    () => import('prismjs/components/prism-iecst.min.js')
  ])),
  'ignore': memo(() => queue([
    () => import('prismjs/components/prism-ignore.min.js')
  ])),
  'inform7': memo(() => queue([
    () => import('prismjs/components/prism-inform7.min.js')
  ])),
  'ini': memo(() => queue([
    () => import('prismjs/components/prism-ini.min.js')
  ])),
  'io': memo(() => queue([
    () => import('prismjs/components/prism-io.min.js')
  ])),
  'j': memo(() => queue([
    () => import('prismjs/components/prism-j.min.js')
  ])),
  'java': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-java.min.js')
  ])),
  'javadoc': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-java.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javadoclike.min.js'),
    () => import('prismjs/components/prism-javadoc.min.js')
  ])),
  'javadoclike': memo(() => queue([
    () => import('prismjs/components/prism-javadoclike.min.js')
  ])),
  'javascript': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javascript.min.js')
  ])),
  'javastacktrace': memo(() => queue([
    () => import('prismjs/components/prism-javastacktrace.min.js')
  ])),
  'jexl': memo(() => queue([
    () => import('prismjs/components/prism-jexl.min.js')
  ])),
  'jolie': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-jolie.min.js')
  ])),
  'jq': memo(() => queue([
    () => import('prismjs/components/prism-jq.min.js')
  ])),
  'js-extras': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-js-extras.min.js')
  ])),
  'js-templates': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-js-templates.min.js')
  ])),
  'jsdoc': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-typescript.min.js'),
    () => import('prismjs/components/prism-javadoclike.min.js'),
    () => import('prismjs/components/prism-jsdoc.min.js')
  ])),
  'json': memo(() => queue([
    () => import('prismjs/components/prism-json.min.js')
  ])),
  'json5': memo(() => queue([
    () => import('prismjs/components/prism-json.min.js'),
    () => import('prismjs/components/prism-json5.min.js')
  ])),
  'jsonp': memo(() => queue([
    () => import('prismjs/components/prism-json.min.js'),
    () => import('prismjs/components/prism-jsonp.min.js')
  ])),
  'jsstacktrace': memo(() => queue([
    () => import('prismjs/components/prism-jsstacktrace.min.js')
  ])),
  'jsx': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-jsx.min.js')
  ])),
  'julia': memo(() => queue([
    () => import('prismjs/components/prism-julia.min.js')
  ])),
  'keepalived': memo(() => queue([
    () => import('prismjs/components/prism-keepalived.min.js')
  ])),
  'keyman': memo(() => queue([
    () => import('prismjs/components/prism-keyman.min.js')
  ])),
  'kotlin': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-kotlin.min.js')
  ])),
  'kumir': memo(() => queue([
    () => import('prismjs/components/prism-kumir.min.js')
  ])),
  'kusto': memo(() => queue([
    () => import('prismjs/components/prism-kusto.min.js')
  ])),
  'latex': memo(() => queue([
    () => import('prismjs/components/prism-latex.min.js')
  ])),
  'latte': memo(() => queue([
    () => import('prismjs/components/prism-php.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-latte.min.js')
  ])),
  'less': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-css.min.js'),
    () => import('prismjs/components/prism-less.min.js')
  ])),
  'lilypond': memo(() => queue([
    () => import('prismjs/components/prism-scheme.min.js'),
    () => import('prismjs/components/prism-lilypond.min.js')
  ])),
  'linker-script': memo(() => queue([
    () => import('prismjs/components/prism-linker-script.min.js')
  ])),
  'liquid': memo(() => queue([
    () => import('prismjs/components/prism-liquid.min.js')
  ])),
  'lisp': memo(() => queue([
    () => import('prismjs/components/prism-lisp.min.js')
  ])),
  'livescript': memo(() => queue([
    () => import('prismjs/components/prism-livescript.min.js')
  ])),
  'llvm': memo(() => queue([
    () => import('prismjs/components/prism-llvm.min.js')
  ])),
  'log': memo(() => queue([
    () => import('prismjs/components/prism-javastacktrace.min.js'),
    () => import('prismjs/components/prism-log.min.js')
  ])),
  'lolcode': memo(() => queue([
    () => import('prismjs/components/prism-lolcode.min.js')
  ])),
  'lua': memo(() => queue([
    () => import('prismjs/components/prism-lua.min.js')
  ])),
  'magma': memo(() => queue([
    () => import('prismjs/components/prism-magma.min.js')
  ])),
  'makefile': memo(() => queue([
    () => import('prismjs/components/prism-makefile.min.js')
  ])),
  'markdown': memo(() => queue([
    () => import('prismjs/components/prism-yaml.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-markdown.min.js')
  ])),
  'markup-templating': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-markup-templating.min.js')
  ])),
  'markup': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js')
  ])),
  'mata': memo(() => queue([
    () => import('prismjs/components/prism-mata.min.js')
  ])),
  'matlab': memo(() => queue([
    () => import('prismjs/components/prism-matlab.min.js')
  ])),
  'maxscript': memo(() => queue([
    () => import('prismjs/components/prism-maxscript.min.js')
  ])),
  'mel': memo(() => queue([
    () => import('prismjs/components/prism-mel.min.js')
  ])),
  'mermaid': memo(() => queue([
    () => import('prismjs/components/prism-mermaid.min.js')
  ])),
  'metafont': memo(() => queue([
    () => import('prismjs/components/prism-metafont.min.js')
  ])),
  'mizar': memo(() => queue([
    () => import('prismjs/components/prism-mizar.min.js')
  ])),
  'mongodb': memo(() => queue([
    () => import('prismjs/components/prism-mongodb.min.js')
  ])),
  'monkey': memo(() => queue([
    () => import('prismjs/components/prism-monkey.min.js')
  ])),
  'moonscript': memo(() => queue([
    () => import('prismjs/components/prism-moonscript.min.js')
  ])),
  'n1ql': memo(() => queue([
    () => import('prismjs/components/prism-n1ql.min.js')
  ])),
  'n4js': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-n4js.min.js')
  ])),
  'nand2tetris-hdl': memo(() => queue([
    () => import('prismjs/components/prism-nand2tetris-hdl.min.js')
  ])),
  'naniscript': memo(() => queue([
    () => import('prismjs/components/prism-naniscript.min.js')
  ])),
  'nasm': memo(() => queue([
    () => import('prismjs/components/prism-nasm.min.js')
  ])),
  'neon': memo(() => queue([
    () => import('prismjs/components/prism-neon.min.js')
  ])),
  'nevod': memo(() => queue([
    () => import('prismjs/components/prism-nevod.min.js')
  ])),
  'nginx': memo(() => queue([
    () => import('prismjs/components/prism-nginx.min.js')
  ])),
  'nim': memo(() => queue([
    () => import('prismjs/components/prism-nim.min.js')
  ])),
  'nix': memo(() => queue([
    () => import('prismjs/components/prism-nix.min.js')
  ])),
  'nsis': memo(() => queue([
    () => import('prismjs/components/prism-nsis.min.js')
  ])),
  'objectivec': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-c.min.js'),
    () => import('prismjs/components/prism-objectivec.min.js')
  ])),
  'ocaml': memo(() => queue([
    () => import('prismjs/components/prism-ocaml.min.js')
  ])),
  'odin': memo(() => queue([
    () => import('prismjs/components/prism-odin.min.js')
  ])),
  'opencl': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-c.min.js'),
    () => import('prismjs/components/prism-cpp.min.js'),
    () => import('prismjs/components/prism-opencl.min.js')
  ])),
  'openqasm': memo(() => queue([
    () => import('prismjs/components/prism-openqasm.min.js')
  ])),
  'oz': memo(() => queue([
    () => import('prismjs/components/prism-oz.min.js')
  ])),
  'parigp': memo(() => queue([
    () => import('prismjs/components/prism-parigp.min.js')
  ])),
  'parser': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-parser.min.js')
  ])),
  'pascal': memo(() => queue([
    () => import('prismjs/components/prism-pascal.min.js')
  ])),
  'pascaligo': memo(() => queue([
    () => import('prismjs/components/prism-pascaligo.min.js')
  ])),
  'pcaxis': memo(() => queue([
    () => import('prismjs/components/prism-pcaxis.min.js')
  ])),
  'peoplecode': memo(() => queue([
    () => import('prismjs/components/prism-peoplecode.min.js')
  ])),
  'perl': memo(() => queue([
    () => import('prismjs/components/prism-perl.min.js')
  ])),
  'php-extras': memo(() => queue([
    () => import('prismjs/components/prism-php-extras.min.js')
  ])),
  'php': memo(() => queue([
    () => import('prismjs/components/prism-php.min.js')
  ])),
  'phpdoc': memo(() => queue([
    () => import('prismjs/components/prism-javadoclike.min.js'),
    () => import('prismjs/components/prism-phpdoc.min.js')
  ])),
  'plant-uml': memo(() => queue([
    () => import('prismjs/components/prism-plant-uml.min.js')
  ])),
  'plsql': memo(() => queue([
    () => import('prismjs/components/prism-sql.min.js'),
    () => import('prismjs/components/prism-plsql.min.js')
  ])),
  'powerquery': memo(() => queue([
    () => import('prismjs/components/prism-powerquery.min.js')
  ])),
  'powershell': memo(() => queue([
    () => import('prismjs/components/prism-powershell.min.js')
  ])),
  'processing': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-processing.min.js')
  ])),
  'prolog': memo(() => queue([
    () => import('prismjs/components/prism-prolog.min.js')
  ])),
  'promql': memo(() => queue([
    () => import('prismjs/components/prism-promql.min.js')
  ])),
  'properties': memo(() => queue([
    () => import('prismjs/components/prism-properties.min.js')
  ])),
  'protobuf': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-protobuf.min.js')
  ])),
  'psl': memo(() => queue([
    () => import('prismjs/components/prism-psl.min.js')
  ])),
  'pug': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-pug.min.js')
  ])),
  'puppet': memo(() => queue([
    () => import('prismjs/components/prism-puppet.min.js')
  ])),
  'pure': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-c.min.js'),
    () => import('prismjs/components/prism-pure.min.js')
  ])),
  'purebasic': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-purebasic.min.js')
  ])),
  'purescript': memo(() => queue([
    () => import('prismjs/components/prism-haskell.min.js'),
    () => import('prismjs/components/prism-purescript.min.js')
  ])),
  'python': memo(() => queue([
    () => import('prismjs/components/prism-python.min.js')
  ])),
  'q': memo(() => queue([
    () => import('prismjs/components/prism-q.min.js')
  ])),
  'qml': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-qml.min.js')
  ])),
  'qore': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-qore.min.js')
  ])),
  'qsharp': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-qsharp.min.js')
  ])),
  'r': memo(() => queue([
    () => import('prismjs/components/prism-r.min.js')
  ])),
  'racket': memo(() => queue([
    () => import('prismjs/components/prism-scheme.min.js'),
    () => import('prismjs/components/prism-racket.min.js')
  ])),
  'reason': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-reason.min.js')
  ])),
  'regex': memo(() => queue([
    () => import('prismjs/components/prism-regex.min.js')
  ])),
  'rego': memo(() => queue([
    () => import('prismjs/components/prism-rego.min.js')
  ])),
  'renpy': memo(() => queue([
    () => import('prismjs/components/prism-renpy.min.js')
  ])),
  'rescript': memo(() => queue([
    () => import('prismjs/components/prism-rescript.min.js')
  ])),
  'rest': memo(() => queue([
    () => import('prismjs/components/prism-rest.min.js')
  ])),
  'rip': memo(() => queue([
    () => import('prismjs/components/prism-rip.min.js')
  ])),
  'roboconf': memo(() => queue([
    () => import('prismjs/components/prism-roboconf.min.js')
  ])),
  'robotframework': memo(() => queue([
    () => import('prismjs/components/prism-robotframework.min.js')
  ])),
  'ruby': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-ruby.min.js')
  ])),
  'rust': memo(() => queue([
    () => import('prismjs/components/prism-rust.min.js')
  ])),
  'sas': memo(() => queue([
    () => import('prismjs/components/prism-sql.min.js'),
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-groovy.min.js'),
    () => import('prismjs/components/prism-lua.min.js'),
    () => import('prismjs/components/prism-sas.min.js')
  ])),
  'sass': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-css.min.js'),
    () => import('prismjs/components/prism-sass.min.js')
  ])),
  'scala': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-java.min.js'),
    () => import('prismjs/components/prism-scala.min.js')
  ])),
  'scheme': memo(() => queue([
    () => import('prismjs/components/prism-scheme.min.js')
  ])),
  'scss': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-css.min.js'),
    () => import('prismjs/components/prism-scss.min.js')
  ])),
  'shell-session': memo(() => queue([
    () => import('prismjs/components/prism-bash.min.js'),
    () => import('prismjs/components/prism-shell-session.min.js')
  ])),
  'smali': memo(() => queue([
    () => import('prismjs/components/prism-smali.min.js')
  ])),
  'smalltalk': memo(() => queue([
    () => import('prismjs/components/prism-smalltalk.min.js')
  ])),
  'smarty': memo(() => queue([
    () => import('prismjs/components/prism-php.min.js'),
    () => import('prismjs/components/prism-smarty.min.js')
  ])),
  'sml': memo(() => queue([
    () => import('prismjs/components/prism-sml.min.js')
  ])),
  'solidity': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-solidity.min.js')
  ])),
  'solution-file': memo(() => queue([
    () => import('prismjs/components/prism-solution-file.min.js')
  ])),
  'soy': memo(() => queue([
    () => import('prismjs/components/prism-soy.min.js')
  ])),
  'sparql': memo(() => queue([
    () => import('prismjs/components/prism-turtle.min.js'),
    () => import('prismjs/components/prism-sparql.min.js')
  ])),
  'splunk-spl': memo(() => queue([
    () => import('prismjs/components/prism-splunk-spl.min.js')
  ])),
  'sqf': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-sqf.min.js')
  ])),
  'sql': memo(() => queue([
    () => import('prismjs/components/prism-sql.min.js')
  ])),
  'squirrel': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-squirrel.min.js')
  ])),
  'stan': memo(() => queue([
    () => import('prismjs/components/prism-stan.min.js')
  ])),
  'stata': memo(() => queue([
    () => import('prismjs/components/prism-mata.min.js'),
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-java.min.js'),
    () => import('prismjs/components/prism-python.min.js'),
    () => import('prismjs/components/prism-stata.min.js')
  ])),
  'stylus': memo(() => queue([
    () => import('prismjs/components/prism-stylus.min.js')
  ])),
  'supercollider': memo(() => queue([
    () => import('prismjs/components/prism-supercollider.min.js')
  ])),
  'swift': memo(() => queue([
    () => import('prismjs/components/prism-swift.min.js')
  ])),
  'systemd': memo(() => queue([
    () => import('prismjs/components/prism-systemd.min.js')
  ])),
  't4-cs': memo(() => queue([
    () => import('prismjs/components/prism-t4-cs.min.js')
  ])),
  't4-templating': memo(() => queue([
    () => import('prismjs/components/prism-t4-templating.min.js')
  ])),
  't4-vb': memo(() => queue([
    () => import('prismjs/components/prism-t4-vb.min.js')
  ])),
  'tap': memo(() => queue([
    () => import('prismjs/components/prism-yaml.min.js'),
    () => import('prismjs/components/prism-tap.min.js')
  ])),
  'tcl': memo(() => queue([
    () => import('prismjs/components/prism-tcl.min.js')
  ])),
  'textile': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-css.min.js'),
    () => import('prismjs/components/prism-textile.min.js')
  ])),
  'toml': memo(() => queue([
    () => import('prismjs/components/prism-toml.min.js')
  ])),
  'tremor': memo(() => queue([
    () => import('prismjs/components/prism-tremor.min.js')
  ])),
  'tsx': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-typescript.min.js'),
    () => import('prismjs/components/prism-jsx.min.js'),
    () => import('prismjs/components/prism-tsx.min.js')
  ])),
  'tt2': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-tt2.min.js')
  ])),
  'turtle': memo(() => queue([
    () => import('prismjs/components/prism-turtle.min.js')
  ])),
  'twig': memo(() => queue([
    () => import('prismjs/components/prism-twig.min.js')
  ])),
  'typescript': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-javascript.min.js'),
    () => import('prismjs/components/prism-typescript.min.js')
  ])),
  'typoscript': memo(() => queue([
    () => import('prismjs/components/prism-typoscript.min.js')
  ])),
  'unrealscript': memo(() => queue([
    () => import('prismjs/components/prism-unrealscript.min.js')
  ])),
  'uorazor': memo(() => queue([
    () => import('prismjs/components/prism-uorazor.min.js')
  ])),
  'uri': memo(() => queue([
    () => import('prismjs/components/prism-uri.min.js')
  ])),
  'v': memo(() => queue([
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-v.min.js')
  ])),
  'vala': memo(() => queue([
    () => import('prismjs/components/prism-regex.min.js'),
    () => import('prismjs/components/prism-clike.min.js'),
    () => import('prismjs/components/prism-vala.min.js')
  ])),
  'vbnet': memo(() => queue([
    () => import('prismjs/components/prism-basic.min.js'),
    () => import('prismjs/components/prism-vbnet.min.js')
  ])),
  'velocity': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-velocity.min.js')
  ])),
  'verilog': memo(() => queue([
    () => import('prismjs/components/prism-verilog.min.js')
  ])),
  'vhdl': memo(() => queue([
    () => import('prismjs/components/prism-vhdl.min.js')
  ])),
  'vim': memo(() => queue([
    () => import('prismjs/components/prism-vim.min.js')
  ])),
  'visual-basic': memo(() => queue([
    () => import('prismjs/components/prism-visual-basic.min.js')
  ])),
  'warpscript': memo(() => queue([
    () => import('prismjs/components/prism-warpscript.min.js')
  ])),
  'wasm': memo(() => queue([
    () => import('prismjs/components/prism-wasm.min.js')
  ])),
  'web-idl': memo(() => queue([
    () => import('prismjs/components/prism-web-idl.min.js')
  ])),
  'wgsl': memo(() => queue([
    () => import('prismjs/components/prism-wgsl.min.js')
  ])),
  'wiki': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-wiki.min.js')
  ])),
  'wolfram': memo(() => queue([
    () => import('prismjs/components/prism-wolfram.min.js')
  ])),
  'wren': memo(() => queue([
    () => import('prismjs/components/prism-wren.min.js')
  ])),
  'xeora': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-xeora.min.js')
  ])),
  'xml-doc': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-xml-doc.min.js')
  ])),
  'xojo': memo(() => queue([
    () => import('prismjs/components/prism-xojo.min.js')
  ])),
  'xquery': memo(() => queue([
    () => import('prismjs/components/prism-markup.min.js'),
    () => import('prismjs/components/prism-xquery.min.js')
  ])),
  'yaml': memo(() => queue([
    () => import('prismjs/components/prism-yaml.min.js')
  ])),
  'yang': memo(() => queue([
    () => import('prismjs/components/prism-yang.min.js')
  ])),
  'zig': memo(() => queue([
    () => import('prismjs/components/prism-zig.min.js')
  ]))
};

export const alias: Readonly<Record<string, string>> = {
  'abap': 'abap',
  'abnf': 'abnf',
  'actionscript': 'actionscript',
  'ada': 'ada',
  'agda': 'agda',
  'al': 'al',
  'antlr4': 'antlr4',
  'apacheconf': 'apacheconf',
  'apex': 'apex',
  'apl': 'apl',
  'applescript': 'applescript',
  'aql': 'aql',
  'arduino': 'arduino',
  'arff': 'arff',
  'armasm': 'armasm',
  'arturo': 'arturo',
  'asciidoc': 'asciidoc',
  'asm6502': 'asm6502',
  'asmatmel': 'asmatmel',
  'aspnet': 'aspnet',
  'autohotkey': 'autohotkey',
  'autoit': 'autoit',
  'avisynth': 'avisynth',
  'avro-idl': 'avro-idl',
  'awk': 'awk',
  'bash': 'bash',
  'basic': 'basic',
  'batch': 'batch',
  'bbcode': 'bbcode',
  'bbj': 'bbj',
  'bicep': 'bicep',
  'birb': 'birb',
  'bison': 'bison',
  'bnf': 'bnf',
  'bqn': 'bqn',
  'brainfuck': 'brainfuck',
  'brightscript': 'brightscript',
  'bro': 'bro',
  'bsl': 'bsl',
  'c': 'c',
  'cfscript': 'cfscript',
  'chaiscript': 'chaiscript',
  'cil': 'cil',
  'cilkc': 'cilkc',
  'cilkcpp': 'cilkcpp',
  'clike': 'clike',
  'clojure': 'clojure',
  'cmake': 'cmake',
  'cobol': 'cobol',
  'coffeescript': 'coffeescript',
  'concurnas': 'concurnas',
  'cooklang': 'cooklang',
  'coq': 'coq',
  'cpp': 'cpp',
  'crystal': 'crystal',
  'csharp': 'csharp',
  'cshtml': 'cshtml',
  'csp': 'csp',
  'css-extras': 'css-extras',
  'css': 'css',
  'csv': 'csv',
  'cue': 'cue',
  'cypher': 'cypher',
  'd': 'd',
  'dart': 'dart',
  'dataweave': 'dataweave',
  'dax': 'dax',
  'dhall': 'dhall',
  'diff': 'diff',
  'django': 'django',
  'dns-zone-file': 'dns-zone-file',
  'docker': 'docker',
  'dot': 'dot',
  'ebnf': 'ebnf',
  'editorconfig': 'editorconfig',
  'eiffel': 'eiffel',
  'ejs': 'ejs',
  'elixir': 'elixir',
  'elm': 'elm',
  'erb': 'erb',
  'erlang': 'erlang',
  'etlua': 'etlua',
  'excel-formula': 'excel-formula',
  'factor': 'factor',
  'false': 'false',
  'firestore-security-rules': 'firestore-security-rules',
  'flow': 'flow',
  'fortran': 'fortran',
  'fsharp': 'fsharp',
  'ftl': 'ftl',
  'gap': 'gap',
  'gcode': 'gcode',
  'gdscript': 'gdscript',
  'gedcom': 'gedcom',
  'gettext': 'gettext',
  'gherkin': 'gherkin',
  'git': 'git',
  'glsl': 'glsl',
  'gml': 'gml',
  'gn': 'gn',
  'go-module': 'go-module',
  'go': 'go',
  'gradle': 'gradle',
  'graphql': 'graphql',
  'groovy': 'groovy',
  'haml': 'haml',
  'handlebars': 'handlebars',
  'haskell': 'haskell',
  'haxe': 'haxe',
  'hcl': 'hcl',
  'hlsl': 'hlsl',
  'hoon': 'hoon',
  'hpkp': 'hpkp',
  'hsts': 'hsts',
  'http': 'http',
  'ichigojam': 'ichigojam',
  'icon': 'icon',
  'icu-message-format': 'icu-message-format',
  'idris': 'idris',
  'iecst': 'iecst',
  'ignore': 'ignore',
  'inform7': 'inform7',
  'ini': 'ini',
  'io': 'io',
  'j': 'j',
  'java': 'java',
  'javadoc': 'javadoc',
  'javadoclike': 'javadoclike',
  'javascript': 'jsx',
  'javastacktrace': 'javastacktrace',
  'jexl': 'jexl',
  'jolie': 'jolie',
  'jq': 'jq',
  'js-extras': 'js-extras',
  'js-templates': 'js-templates',
  'jsdoc': 'jsdoc',
  'json': 'json',
  'json5': 'json5',
  'jsonp': 'jsonp',
  'jsstacktrace': 'jsstacktrace',
  'jsx': 'jsx',
  'julia': 'julia',
  'keepalived': 'keepalived',
  'keyman': 'keyman',
  'kotlin': 'kotlin',
  'kumir': 'kumir',
  'kusto': 'kusto',
  'latex': 'latex',
  'latte': 'latte',
  'less': 'less',
  'lilypond': 'lilypond',
  'linker-script': 'linker-script',
  'liquid': 'liquid',
  'lisp': 'lisp',
  'livescript': 'livescript',
  'llvm': 'llvm',
  'log': 'log',
  'lolcode': 'lolcode',
  'lua': 'lua',
  'magma': 'magma',
  'makefile': 'makefile',
  'markdown': 'markdown',
  'markup-templating': 'markup-templating',
  'markup': 'markup',
  'mata': 'mata',
  'matlab': 'matlab',
  'maxscript': 'maxscript',
  'mel': 'mel',
  'mermaid': 'mermaid',
  'metafont': 'metafont',
  'mizar': 'mizar',
  'mongodb': 'mongodb',
  'monkey': 'monkey',
  'moonscript': 'moonscript',
  'n1ql': 'n1ql',
  'n4js': 'n4js',
  'nand2tetris-hdl': 'nand2tetris-hdl',
  'naniscript': 'naniscript',
  'nasm': 'nasm',
  'neon': 'neon',
  'nevod': 'nevod',
  'nginx': 'nginx',
  'nim': 'nim',
  'nix': 'nix',
  'nsis': 'nsis',
  'objectivec': 'objectivec',
  'ocaml': 'ocaml',
  'odin': 'odin',
  'opencl': 'opencl',
  'openqasm': 'openqasm',
  'oz': 'oz',
  'parigp': 'parigp',
  'parser': 'parser',
  'pascal': 'pascal',
  'pascaligo': 'pascaligo',
  'pcaxis': 'pcaxis',
  'peoplecode': 'peoplecode',
  'perl': 'perl',
  'php-extras': 'php-extras',
  'php': 'php',
  'phpdoc': 'phpdoc',
  'plant-uml': 'plant-uml',
  'plsql': 'plsql',
  'powerquery': 'powerquery',
  'powershell': 'powershell',
  'processing': 'processing',
  'prolog': 'prolog',
  'promql': 'promql',
  'properties': 'properties',
  'protobuf': 'protobuf',
  'psl': 'psl',
  'pug': 'pug',
  'puppet': 'puppet',
  'pure': 'pure',
  'purebasic': 'purebasic',
  'purescript': 'purescript',
  'python': 'python',
  'q': 'q',
  'qml': 'qml',
  'qore': 'qore',
  'qsharp': 'qsharp',
  'r': 'r',
  'racket': 'racket',
  'reason': 'reason',
  'regex': 'regex',
  'rego': 'rego',
  'renpy': 'renpy',
  'rescript': 'rescript',
  'rest': 'rest',
  'rip': 'rip',
  'roboconf': 'roboconf',
  'robotframework': 'robotframework',
  'ruby': 'ruby',
  'rust': 'rust',
  'sas': 'sas',
  'sass': 'sass',
  'scala': 'scala',
  'scheme': 'scheme',
  'scss': 'scss',
  'shell-session': 'shell-session',
  'smali': 'smali',
  'smalltalk': 'smalltalk',
  'smarty': 'smarty',
  'sml': 'sml',
  'solidity': 'solidity',
  'solution-file': 'solution-file',
  'soy': 'soy',
  'sparql': 'sparql',
  'splunk-spl': 'splunk-spl',
  'sqf': 'sqf',
  'sql': 'sql',
  'squirrel': 'squirrel',
  'stan': 'stan',
  'stata': 'stata',
  'stylus': 'stylus',
  'supercollider': 'supercollider',
  'swift': 'swift',
  'systemd': 'systemd',
  't4-cs': 't4-cs',
  't4-templating': 't4-templating',
  't4-vb': 't4-vb',
  'tap': 'tap',
  'tcl': 'tcl',
  'textile': 'textile',
  'toml': 'toml',
  'tremor': 'tremor',
  'tsx': 'tsx',
  'tt2': 'tt2',
  'turtle': 'turtle',
  'twig': 'twig',
  'typescript': 'tsx',
  'typoscript': 'typoscript',
  'unrealscript': 'unrealscript',
  'uorazor': 'uorazor',
  'uri': 'uri',
  'v': 'v',
  'vala': 'vala',
  'vbnet': 'vbnet',
  'velocity': 'velocity',
  'verilog': 'verilog',
  'vhdl': 'vhdl',
  'vim': 'vim',
  'visual-basic': 'visual-basic',
  'warpscript': 'warpscript',
  'wasm': 'wasm',
  'web-idl': 'web-idl',
  'wgsl': 'wgsl',
  'wiki': 'wiki',
  'wolfram': 'wolfram',
  'wren': 'wren',
  'xeora': 'xeora',
  'xml-doc': 'xml-doc',
  'xojo': 'xojo',
  'xquery': 'xquery',
  'yaml': 'yaml',
  'yang': 'yang',
  'zig': 'zig',
  'sh': 'bash',
  'zsh': 'bash',
  'ksh': 'bash',
  'fish': 'bash',
  'shell': 'bash',
  'unix': 'bash',
  'command': 'bash',
  'h': 'c',
  'cc': 'cpp',
  'c++': 'cpp',
  'h++': 'cpp',
  'hpp': 'cpp',
  'hh': 'cpp',
  'hxx': 'cpp',
  'cxx': 'cpp',
  'chasp': 'csharp',
  'cs': 'csharp',
  'c#': 'csharp',
  'erl': 'erlang',
  'ex': 'elixir',
  'exs': 'elixir',
  'golang': 'go',
  'hbs': 'handlebars',
  'html.hbs': 'handlebars',
  'html.handlebars': 'handlebars',
  'htmlbars': 'handlebars',
  'hs': 'haskell',
  'jsp': 'java',
  'js': 'jsx',
  'mjs': 'jsx',
  'cjs': 'jsx',
  'kt': 'kotlin',
  'kts': 'kotlin',
  'mk': 'makefile',
  'mak': 'makefile',
  'make': 'makefile',
  'md': 'markdown',
  'mkdown': 'markdown',
  'mkd': 'markdown',
  'mm': 'objectivec',
  'objc': 'objectivec',
  'obj-c': 'objectivec',
  'obj-c++': 'objectivec',
  'objective-c++': 'objectivec',
  'pl': 'perl',
  'pm': 'perl',
  'py': 'python',
  'gyp': 'python',
  'ipython': 'python',
  'rb': 'ruby',
  'gemspec': 'ruby',
  'podspec': 'ruby',
  'thor': 'ruby',
  'irb': 'ruby',
  'rs': 'rust',
  'craftcms': 'twig',
  'ts': 'tsx',
  'yml': 'yaml'
};
