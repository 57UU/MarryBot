/**
 * ��ȡ��ǰҳ��ȥ�����ɼ����ݺ�Ĵ� HTML
 * @param {Object} [options]
 * @param {boolean} [options.stripAttrs] - �Ƿ�ȥ���������ԣ�Ĭ�� false��
 * @returns {string} - ������� HTML
 */
function getCleanHTML(options = {}) {
  const { stripAttrs = false } = options;

  // 1. ��¡һ���ĵ��������޸�ԭҳ��
  const clonedDoc = document.documentElement.cloneNode(true);

  // 2. ��Ҫɾ���ı�ǩ�б�
  const REMOVABLE_TAGS = [
    'style',
    'link[rel="stylesheet"]',
    'script',
    'noscript',
    'template',
    'svg',
    'canvas',
    'audio',
    'video',
    'iframe',
    'embed',
    'object',
    'head', // ���� <head> Ҳ���Բ�Ҫ
  ];

  REMOVABLE_TAGS.forEach(selector => {
    clonedDoc.querySelectorAll(selector).forEach(el => el.remove());
  });

  // 3. ȥ�� style ��������
  clonedDoc.querySelectorAll('*').forEach(el => {
    el.removeAttribute('style');
    if (stripAttrs) {
      // ȥ����������
      [...el.attributes].forEach(attr => el.removeAttribute(attr.name));
    } else {
      // ��ȥ�������ڴ��ı�չʾ������
      ['class', 'id', 'data-*'].forEach(attr => {
        if (attr === 'data-*') {
          [...el.attributes]
            .filter(a => a.name.startsWith('data-'))
            .forEach(a => el.removeAttribute(a.name));
        } else {
          el.removeAttribute(attr);
        }
      });
    }
  });

  // 4. �����ַ���
  return clonedDoc.outerHTML;
}
return getCleanHTML()