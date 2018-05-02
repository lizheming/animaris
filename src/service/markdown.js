const down = {
  h(text, size = 2) {
    return `${'#'.repeat(size)} ${text}`;
  },
  p(text) {
    return `${text}  `;
  },
  args(data) {
    const mk = data.map(([name, should, type, desc]) => `| ${name} | ${should} | ${type} | ${desc} |`);
    return `|参数名称|必填|参数类型|备注|
|----|--|----|--|
${mk.join('\r\n')}`;
  },
  code(code) {
    return `\`\`\`javascript
${code}
\`\`\``;
  }
};

module.exports = class extends think.Service {
  callFormatRender(str, data) {
    return str.replace(/\${(\w+)}/g, (a, b) => data[b]);
  }

  buildCallExample(api) {
    let code = '$';
    code += api.name;
    code += ':';

    // const args = {};
    // if (typeof api.args === 'object') {
    //   for (var i in api.args) {
    //     args[i] = api.args[i].value;
    //   }
    // }
    const args = api.args.length ? api.args.reduce((v, o) => {
      v[o.name] = o.value;
      return v;
    }, {}) : {};

    // 调用格式和普通格式不一样的时候
    if (api.format) {
      return `console.log('${this.callFormatRender(api.format, args)}');`;
    }

    if (args.callback) {
      return `console.log('${code}{callback: ${args.callback}}');`;
    }

    return `console.log('${code}${JSON.stringify(args)}');`;
  }

  buildRespExample(api) {
    let callback = api.callback;
    if (!callback) {
      if (api.args.length) {
        const cb = api.args.find(arg => arg.name === 'callback');
        if (cb) {
          callback = cb.value;
        }
      }
    }
    if (!callback) {
      return '';
    }
    // const callback = api.callback || (api.args && api.args.callback && api.args.callback.value);

    return `function ${callback}(resp) {
    console.log(resp);
}
//输出
${JSON.stringify(api.resp[0].content, null, '  ')}
  `;
  }
  build({interfaces: apis}) {
    const result = [];
    for (const api of apis) {
      const cate = down.h(api.cate);
      if (!result.includes(cate)) {
        result.push(cate);
      }
      result.push(down.h(api.name));
      result.push(down.p(api.desc));

      if (api.args.length) {
        result.push(down.h('参数说明：', 5));
        result.push(down.args(api.args.sort((a, b) => {
          const aRequired = a.required !== false;
          const bRequired = b.required !== false;
          if (aRequired === bRequired) {
            return 0;
          }

          if (aRequired && !bRequired) {
            return -1;
          }

          if (!aRequired && bRequired) {
            return 1;
          }
        }).map(arg => ([
          arg.name,
          arg.required === false ? 'N' : 'Y',
          arg.type,
          arg.description || '无'
        ]))));
      }
      result.push(down.h('调用示例：', 5));
      result.push(down.code(this.buildCallExample(api)));

      if (api.resp.length && api.resp[0].content) {
        result.push(down.h('响应示例：', 5));
        result.push(down.code(this.buildRespExample(api)));
      }
    }
    return result.join('\r\n');
  }
};
