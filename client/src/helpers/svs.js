// server values support
export class svs {
    
    static getRetrun(needle = null, haystack) {

        if (typeof needle == 'string') {
            return this.getIdByKey(needle, haystack);
        }

        if (typeof needle == 'number') {
            return this.getItemById(needle, haystack, 'name');
        }

        // return label value itself
        return haystack;
    }

    static getItemById(id, items, returnItem = null) {
        const item = items.find(item => item.id === id);

        if (!item) {
            return false;
        }

        if (returnItem !== null) {
            return item[returnItem];
        }

        return item;
    }

    static getIdByKey(key, items) {

        for (let index in items) {
            if (items[index]['key'] == key) {
                return items[index]['id'];
            }
        }

        return false;
    }
}