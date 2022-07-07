// 请实现 DOM2JSON 一个函数，可以把一个 DOM 节点输出 JSON 的格式
function dom2json(dom) {
  const parseDom = (node) => {
    let json = {};
    const nodeType = node.nodeType;
    // debugger;
    if (nodeType !== 1 && nodeType !== 3) {
      console.log(nodeType);
      return;
    }

    const nodeName = node.nodeName.toLowerCase();
    const childNodes = Array.from(node.childNodes).filter((item) => {
      const name = item.nodeName;
      return (name === '#text' && item.data.trim() !== '') || name !== '#text';
    });

    json.tag = nodeName;
    json.children = [];
    json.attributes = {};

    if (node.attributes && node.attributes.length > 0) {
      console.log(node.attributes);
      for (let i = 0; i < node.attributes.length; i++) {
        const { name, value } = node.attributes[i];
        console.log(name, value);
        json.attributes[name] = value;
      }
    }

    if (nodeType === 3) {
      json.content = node.textContent.trim();
      delete json.attributes;
      delete json.children;
    }

    if (childNodes.length > 0) {
      Array.from(childNodes).forEach(childNode => {
        const childJson = parseDom(childNode);
        if (childJson) {
          json.children.push(childJson);
        }
      })
    }

    return json;
  }

  return parseDom(dom);
}

const nodeEl = document.getElementById('box');
const result = dom2json(nodeEl);

console.log(result);
