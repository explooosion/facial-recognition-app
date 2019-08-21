/* eslint-disable no-useless-escape */
import stringify from 'stringify-object';

/**
* Format user descriptors to export
* @param {string} name 
* @param {array} datas 
*/
export const formatDescriptors = (name = 'Robby Wu', datas = []) => {
    const descriptors = datas.map(m => stringify(m.join(',')));
    return JSON
        .stringify({ name, descriptors })
        .replace(/\"'/g, '\n    [')
        .replace(/\'"/g, ']')
        .replace(/\]]/g, ']\n]')
        .replace(/\"descriptors":/g, '\n  "descriptors": ')
        .replace(/\"name":/g, '\n  "name": ')
        .replace(/\]}/g, '  ]\n}')
}

export const downloadObjectAsJson = (exportObj, exportName) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportObj);
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', exportName + '.json');
    document.body.appendChild(a);
    a.click();
    a.remove();
}