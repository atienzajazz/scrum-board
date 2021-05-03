import { tasks, columns, columnOrder } from './initial-data'

const LocalStorage = function () {
    function set(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    }

    function get(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    function remove(key) {
        localStorage.removeItem(key);
    }

    function init() {
        if (!get('tasks')) {
            set('tasks', tasks);
        }
        if (!get('columns')) {
            set('columns', columns);
        }
        if (!get('columnOrder')) {
            set('columnOrder', columnOrder);
        }
    }

    return {
        set: set,
        get: get,
        remove: remove,
        init: init
    }
}();

export default LocalStorage;