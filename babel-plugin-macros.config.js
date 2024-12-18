const isDev = process.env.NODE_ENV !== 'production';
module.exports = {
    styledComponents: {
        fileName: isDev,
        displayName: isDev
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    
}