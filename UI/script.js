/* global console */
class PhotoPostsList {
    constructor(photoPosts) {
        this._photoPosts = photoPosts.filter(item => PhotoPostsList.validate(item));
    }

    static _compareDates(a, b) {
        return b.createdAt - a.createdAt;
    }

    getPage(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 10;
        if (filterConfig === undefined) {
            return this._photoPosts.slice(skip, skip + top).sort(this.constructor._compareDates);
        }
        let result = this._photoPosts;
        if (filterConfig.author !== undefined) {
            result = result.filter(function (a) {
                return a.author === filterConfig.author;
            });
        }
        if (filterConfig.dateUpLim instanceof Date) {
            result = result.filter(function (a) {
                return a.createdAt <= filterConfig.dateUpLim;
            });
        }
        if (filterConfig.dateDownLim instanceof Date) {
            result = result.filter(function (a) {
                return a.createdAt >= filterConfig.dateDownLim;
            });
        }
        if (filterConfig.tags !== undefined) {
            result = result.filter(function (a) {
                return filterConfig.tags.every(function (t) {
                    for (let item of a.tags) {
                        if (item.toLocaleLowerCase() === t.toLocaleLowerCase()) {
                            return true;
                        }
                    }
                    return false;
                })
            });
        }
        return result.slice(skip, skip + top).sort(this.constructor._compareDates);
    }

    get(id) {
        if (parseInt(id) > 0 && parseInt(id) && parseInt(id) <= this._photoPosts[this._photoPosts.length - 1].id) {
            for (let item of this._photoPosts) {
                if (item.id === id) {
                    return item;
                }
            }
        }
        return false;
    }

    static _checkPhotoLink(photoLink) {
        return typeof (photoLink) == 'string';
    }

    static _checkDescription(description) {
        return (typeof (description) == 'string' && description.length <= 200) ||
            typeof (description) == 'undefined';
    }

    static _checkAuthor(author) {
        return typeof (author) == 'string';
    }

    static _checkId(id) {
        return typeof (typeof (id) == 'string') && parseInt(id) > 0;
    }

    static _checkDate(date) {
        return date instanceof Date;
    }

    static _checkTags(tags) {
        if (Array.isArray(tags)) {
            for (let item of tags) {
                if (!(typeof (item) == 'string')) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    static validate(photoPost) {
        return (typeof (photoPost) == 'object') &&
            this._checkPhotoLink(photoPost.photoLink) &&
            this._checkDescription(photoPost.description) &&
            this._checkAuthor(photoPost.author) &&
            this._checkDate(photoPost.createdAt) &&
            this._checkId(photoPost.id) &&
            this._checkTags(photoPost.tags);
    }

    static _checkChanges(photoPost) {
        if (typeof (photoPost) == "object") {
            if (photoPost.description === undefined || this._checkDescription(photoPost.description)) {
                if (photoPost.tags === undefined || this._checkTags(photoPost.tags)) {
                    return photoPost.photoLink === undefined || this._checkPhotoLink(photoPost.photoLink);
                }
            }
        }
        return false;
    }

    add(photoPost) {
        photoPost.id = parseInt(this._photoPosts[this._photoPosts.length - 1].id) + 1;
        photoPost.id += "";
        photoPost.likes = [];
        photoPost.createdAt = new Date();
        if (this.constructor.validate(photoPost)) {
            this._photoPosts.push(photoPost);
            return true;
        }
        return false;
    }

    edit(id, photoPost) {
        if (!this.constructor._checkChanges(photoPost)) {
            return false;
        }
        if (parseInt(id) > 0 && parseInt(id) && parseInt(id) <= this._photoPosts[this._photoPosts.length - 1].id) {
            for (let i = 0; i < this._photoPosts.length; i++) {
                if (this._photoPosts[i].id === id) {
                    if (photoPost.description !== undefined) {
                        this._photoPosts[i].description = photoPost.description;
                    }
                    if (photoPost.tags !== undefined) {
                        this._photoPosts[i].tags = photoPost.tags;
                    }
                    if (photoPost.photoLink !== undefined) {
                        this._photoPosts[i].photoLink = photoPost.photoLink;
                    }
                    return true;
                }
            }
        }
        return false;
    }

    remove(id) {
        if (parseInt(id) > 0 && parseInt(id) && parseInt(id) <= this._photoPosts[this._photoPosts.length - 1].id) {
            for (let i = 0; i < this._photoPosts.length; i++) {
                if (this._photoPosts[i].id === id) {
                    this._photoPosts.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }

    addAll(photoPostList) {
        if (!Array.isArray(photoPostList)) {
            return false;
        }
        let result = [];
        for (let item of photoPostList) {
            if (!this.add(item)) {
                result.push(item);
            }
        }
        return result;
    }

    clear() {
        this._photoPosts.splice(0, this._photoPosts.length);
    }
}

let photoPostsList = new PhotoPostsList([
    {
        id: '1',
        description: 'Hello, 1',
        createdAt: new Date('2018-01-23T23:00:00'),
        author: 'NewFag',
        photoLink: 'images/example1',
        tags: ['Love', 'Sleep'],
        likes: ['NewFag', "CatLover"],
    },
    {
        id: '2',
        description: 'Hello, 2',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 'OldFag',
        photoLink: 'images/example2',
        tags: ['Hardcore', 'Olds', 'Like'],
        likes: ['OldFag', 'NewFag', 'SonOfMom'],
    },
    {
        id: '3',
        description: 'Hello, 3',
        createdAt: new Date('2018-03-23T23:00:00'),
        author: 'CatLover',
        photoLink: 'images/example3',
        tags: ['Cats', 'Sleep', 'Like'],
        likes: ['CatLover', 'Pretty_Kitty'],
    },
    {
        id: '4',
        description: 'Hello, 4',
        createdAt: new Date('2018-04-23T23:00:00'),
        author: 'SonOfMum',
        photoLink: 'images/example4',
        tags: ['Cats', 'Sleep'],
        likes: ['SonOfMum', 'Mum'],
    },
    {
        id: '5',
        description: 'Hello, 5',
        createdAt: new Date('2018-05-23T23:00:00'),
        author: 'Witcher',
        photoLink: 'images/example5',
        tags: ['Love', 'Sleep', 'Cats'],
        likes: ['Witcher', 'OldFag'],
    },
    {
        id: '6',
        description: 'Hello, 6',
        createdAt: new Date('2018-06-23T23:00:00'),
        author: 'Witcher',
        photoLink: 'images/example6',
        tags: ['Love', 'Like', 'Sleep'],
        likes: ['Witcher', 'OldFag'],
    },
    {
        id: '7',
        description: 'Hello, 7',
        createdAt: new Date('2018-07-23T23:00:00'),
        author: 'OldFag',
        photoLink: 'images/example7',
        tags: ['Love', 'Cats', 'Sleep', 'Like'],
        likes: ['NewFag', 'OldFag'],
    },
    {
        id: '8',
        description: 'Hello, 8',
        createdAt: new Date('2018-08-23T23:00:00'),
        author: 'CatLover',
        photoLink: 'images/example8',
        tags: ['Spiders'],
        likes: ['NewFag', 'CatLover'],
    },
    {
        id: '9',
        description: 'Hello, 9',
        createdAt: new Date('2018-09-23T23:00:00'),
        author: 'NewFag',
        photoLink: 'images/example9',
        tags: ['Animals'],
        likes: ['CatLover', 'WindowsUser'],
    },
    {
        id: '10',
        description: 'Hello, 10',
        createdAt: new Date('2018-10-23T23:00:00'),
        author: 'Witcher',
        photoLink: 'images/example10',
        tags: ['Spiders', 'Animals'],
        likes: ['Witcher', 'NewFag', 'OldFag'],
    },
    {
        id: '11',
        description: 'Hello, 11',
        createdAt: new Date('2018-11-23T23:00:00'),
        author: 'SonOfMum',
        photoLink: 'images/example11',
        tags: ['Sony', 'Nintendo', 'Sega'],
        likes: ['SonyBoy', 'Mario'],
    },
    {
        id: '12',
        description: 'Hello, 12',
        createdAt: new Date('2018-12-23T23:00:00'),
        author: 'JSer',
        photoLink: 'images/example12',
        tags: ['Nintendo', 'Sega', 'Sony'],
        likes: ['WindowsUser', 'NewFag', 'OldFag', 'JSer'],
    },
    {
        id: '13',
        description: 'Hello, 13',
        createdAt: new Date('2018-12-24T23:00:00'),
        author: 'JSer',
        photoLink: 'images/example13',
        tags: ['Sony', 'Microsoft'],
        likes: ['Javer', 'JSer'],
    },
    {
        id: '14',
        description: 'Hello, 14',
        createdAt: new Date('2018-12-25T23:00:00'),
        author: 'Javer',
        photoLink: 'images/example14',
        tags: ['XBOX', 'XBOXONE', 'GodOfWar'],
        likes: ['SonyBoy', 'Witcher'],
    },
    {
        id: '15',
        description: 'Hello, 15',
        createdAt: new Date('2018-12-26T23:00:00'),
        author: 'Javer',
        photoLink: 'images/example15',
        tags: ['BOX', 'PC', 'PS4'],
        likes: ['Javer', 'WindowsUser'],
    },
    {
        id: '16',
        description: 'Hello, 16',
        createdAt: new Date('2018-12-27T23:00:00'),
        author: 'WindowsUser',
        photoLink: 'images/example16',
        tags: ['PC', 'PS4', 'Games'],
        likes: ['Javer', 'WindowsUser'],
    },
    {
        id: '17',
        description: 'Hello, 17',
        createdAt: new Date('2018-12-28T23:00:00'),
        author: 'WindowsUser',
        photoLink: 'images/example17',
        tags: ['Sport', 'Football'],
        likes: ['WindowsUser', "PC_LOver"],
    },
    {
        id: '18',
        description: 'Hello, 18',
        createdAt: new Date('2017-12-30T12:35:00'),
        author: 'CatLover',
        photoLink: 'images/example18',
        tags: ['Kitten', 'Kittens', 'Cats'],
        likes: [''],
    },
    {
        id: '19',
        description: 'Hello, 19',
        createdAt: new Date('2018-12-29T23:00:00'),
        author: 'OldFag',
        photoLink: 'images/example19',
        tags: ['Gym'],
        likes: ['NewFag', 'OldFag'],
    },

    {
        id: '20',
        description: 'Hello, 20',
        createdAt: new Date('2017-12-30T12:35:00'),
        author: 'GalaxyMan',
        photoLink: 'images/example20',
        tags: ['Sport', 'Gym'],
        likes: ['GalaxyMan'],
    },]);
console.log('photoPostsList.get(\'1\')');
console.log(photoPostsList.get('1'));

console.log('photoPostsList.get(\'sdadsasdadsa\')');
console.log(photoPostsList.get('sdadsasdadsa'));

console.log('photoPostsList.get(\'123123\')');
console.log(photoPostsList.get('123123'));

console.log('photoPostsList.get(\'{a:\'fdf\'}}\')');
console.log(photoPostsList.get({a: 'fdf'}));

console.log('photoPostsList.getPage()');
console.log(photoPostsList.getPage());

console.log('photoPostsList.getPage(10, 10)');
console.log(photoPostsList.getPage(10, 10));

console.log('photoPostsList.getPage(0, 10, {author: \'Witcher\'})');
console.log(photoPostsList.getPage(0, 10, {author: 'Witcher'}))

console.log('photoPostsList.getPage(0, 10, {author: \'Witcher\', tags: [\'Love\']})');
console.log(photoPostsList.getPage(0, 10, {author: 'Witcher', tags: ['Love']}));

console.log('photoPostsList.getPage(0, 10, {author: \'Witcher\', tags: [\'Love\', \'caTS\']})');
console.log(photoPostsList.getPage(0, 10, {author: 'Witcher', tags: ['Love', 'caTS']}));

console.log('photoPostsList.add({description: \'Hello, 16\', photoLink: \'images/example16\', tags:[\'JS\']})');
console.log(photoPostsList.add({description: 'Hello, 16', photoLink: 'images/example16', tags: ['JS']}));

console.log('photoPostsList.add({description: \'Hello, 16\',author: \'WindowsUser\', tags:[\'JS\']})');
console.log(photoPostsList.add({description: 'Hello, 16', author: 'WindowsUser', tags: ['JS']}));

console.log('photoPostsList.add({description: \'Hello, 16\',author: \'WindowsUser\',photoLink: \'images/example16\', tags:[\'JS\']})');
console.log(photoPostsList.add({
    description: 'Hello, 16',
    author: 'WindowsUser',
    photoLink: 'images/example16',
    tags: ['JS']
}));

console.log('photoPostsList.get(21)');
console.log(photoPostsList.get('21'));

console.log('photoPostsList.remove(\'21\')');
console.log(photoPostsList.remove('21'));

console.log('photoPostsList.getPage(0,20)');
console.log(photoPostsList.getPage(0, 20));

console.log('photoPostsList.edit(\'1\',{description:{name:\'Vlad\'}})');
console.log(photoPostsList.edit('1', {description: {name: 'Vlad'}}));

console.log('photoPostsList.edit(\'1\',{photoLink: [\'Hello\', \'Andrey\']})');
console.log(photoPostsList.edit('1', {photoLink: ['Hello', 'Andrey']}));

console.log('photoPostsList.edit(\'1\',{tags: {}})');
console.log(photoPostsList.edit('1', {tags: {}}));

console.log('photoPostsList.edit(\'1\',{description: \'Hello JS\' ,tags:[\'Hello\', \'JS\']})');
console.log(photoPostsList.edit('1', {description: 'Hello JS', tags: ['Hello', 'JS']}));

console.log('photoPostsList.get(1)');
console.log(photoPostsList.get('1'));

console.log('photoPostsList.edit(\'1\',{photoLink: \'images/Hello_JS.jpg\'})');
console.log(photoPostsList.edit('1', {photoLink: 'images/Hello_JS.jpg'}));

console.log('photoPostsList.get(1)');
console.log(photoPostsList.get('1'));

console.log('photoPostsList.remove(\'1\')');
console.log(photoPostsList.remove('1'));

console.log('photoPostsList.remove(\'1\')');
console.log(photoPostsList.remove('1'));

console.log('photoPostsList.remove(\'123\')');
console.log(photoPostsList.remove('123'));

console.log('photoPostsList.remove(\'JS\')');
console.log(photoPostsList.remove('JS'));

console.log('photoPostsList.addAll([{\n' +
    '        id: \'1\',\n' +
    '        description: \'Hello, 1\',\n' +
    '        createdAt: new Date(\'2018-01-23T23:00:00\'),\n' +
    '        author: \'NewFag\',\n' +
    '        photoLink: \'images/example1\',\n' +
    '        tags: [\'Love\', \'Sleep\'],\n' +
    '        likes: [\'NewFag\', "CatLover"],\n' +
    '    },\n' +
    '    {\n' +
    '        id: \'2\',\n' +
    '        description: \'Hello, 2\',\n' +
    '        createdAt: new Date(\'2018-02-23T23:00:00\'),\n' +
    '        author: \'OldFag\',\n' +
    '        photoLink: \'images/example2\',\n' +
    '        tags: [\'Hardcore\', \'Olds\', \'Like\'],\n' +
    '        likes: [\'OldFag\', \'NewFag\', \'SonOfMom\'],\n' +
    '    },\n' +
    '    {\n' +
    '        id: \'3\',\n' +
    '        description: \'Hello, 3\',\n' +
    '        createdAt: new Date(\'2018-03-23T23:00:00\'),\n' +
    '        author: \'CatLover\',\n' +
    '        photoLink: \'images/example3\',\n' +
    '        tags: [\'Cats\', \'Sleep\', \'Like\'],\n' +
    '        likes: [\'CatLover\', \'Pretty_Kitty\'],\n' +
    '    }])');
console.log(photoPostsList.addAll([{
    id: '1',
    description: 'Hello, 1',
    createdAt: new Date('2018-01-23T23:00:00'),
    author: 'NewFag',
    photoLink: 'images/example1',
    tags: ['Love', 'Sleep'],
    likes: ['NewFag', "CatLover"],
},
    {
        id: '2',
        description: 'Hello, 2',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 'OldFag',
        tags: ['Hardcore', 'Olds', 'Like'],
        likes: ['OldFag', 'NewFag', 'SonOfMom'],
    },
    {
        id: '3',
        description: 'Hello, 3',
        createdAt: new Date('2018-03-23T23:00:00'),
        photoLink: 'images/example3',
        tags: ['Cats', 'Sleep', 'Like'],
        likes: ['CatLover', 'Pretty_Kitty'],
    }]));

console.log('photoPostList.clear()');
photoPostsList.clear();

console.log('photoPostList.getPage()');
console.log(photoPostsList.getPage());