type LogLevel = 'info' | 'warn' | 'error' | 'debug'

class Logger {
    private isDev: boolean

    constructor(){
        this.isDev = process.env.NODE_ENV !== 'production'
    }

    log(level: LogLevel, ...args: unknown[]){
        if(!this.isDev && level === 'debug') return

        const colorMap: Record<LogLevel,string> = {
            info: 'color: #2f86eb',
            warn: 'color: orange',
            error: 'color: red',
            debug: 'color: gray',
        }
        const label = `%c[${level.toUpperCase()}] [${new Date().toISOString()}]:`
        console[level](label, colorMap[level], ...args)
    }
    info(...args: unknown[]){
        this.log('info',...args)
    }
    
    debug(...args: unknown[]){
        this.log('debug',...args)
    }
    
    warn(...args: unknown[]){
        this.log('warn',...args)
    }
    error(...args: unknown[]){
        this.log('error',...args)
    }
}

const logger = new Logger()
export default logger