import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'
import autoprefixer from 'autoprefixer'

export default [
   {
      input: './src/lib/lib.js',
      output: {
         file: 'dist/index.js',
         format: 'iife',
         name: 'Zapper',
      },
      inlineDynamicImports: true,
      plugins: [
         replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
         }),
         copy({
            targets: [{ src: 'src/assets/fonts', dest: 'dist/assets' }],
         }),

         resolve({ extensions: ['.js', '.jsx'], browser: true }),
         babel({
            presets: [['@babel/preset-react']],
            extensions: ['.js', '.jsx'],
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
         }),
         svgr(),
         url({
            include: ['**/*.svg', '**/*.png'],
            limit: 0,
            emitFiles: true,
         }),
         postcss({
            extract: 'assets/css/bundle.css',
            plugins: [autoprefixer()],
            minimize: true,
         }),
         commonjs(),
         terser({
            compress: { toplevel: true },
         }),
      ],
   },
]
