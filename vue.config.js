module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                'assets'     : '@/assets',
                'components' : '@/components',
                'plugins'    : '@/plugins',
                'common'     : '@/components/common',
                'content'    : '@/components/content',
                'views'      : '@/views'
            }
        }
    }
    
}