const { loadEnvConfig } = require('@next/env')
loadEnvConfig(process.cwd())

module.exports = {
    schema:process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
    documents: './src/**/*.graphql',
    generates: {
      '__generated__': {
        plugins:[
          'typescript-operations',
         ' typescript-react-apollo'],
      },
    }
    // plugins:[
    //    'typescript-operations',
    //   ' typescript-react-apollo'],
    // cacheDir: '__generated__'
    
}