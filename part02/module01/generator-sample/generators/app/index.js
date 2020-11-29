const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    prompting() {
        return this.prompt([
            {
                type: "input",
                name:"name",
                message: "your project name?",
                default: this.appname 
            },
            {
                type: "input",
                name: "description",
                message: "your project name?",
                default: this.description
            }
        ])
        .then(answers => {
            this.answers = answers 
        })
    }
    
    writing() {
        // 模板路径
        const tmpl = this.templatePath('template.text')
        // 输出模板路径
        const dest = this.destinationPath('template. ')
        // 模板上下文
        const tmplContext = { title: this.answers.name}

        this.fs.copyTpl(tmpl, dest, tmplContext)
    }
}