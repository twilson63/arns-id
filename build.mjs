import esbuild from 'esbuild'

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  outfile: 'dist/bundle.js',
  format: 'esm'
})

/*
esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.cjs',
  format: 'cjs'
})
*/