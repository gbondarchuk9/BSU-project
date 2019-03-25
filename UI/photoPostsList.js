class PhotoPostsList {
    constructor(photoPosts) {
        this._photoPosts = photoPosts.filter(item => PhotoPostsList.validate(item));
    }

    static _compareDates(a, b) {
        return b.createdAt - a.createdAt;
    }

    getPage(skip = 0, top = 10, filterConfig) {
        this._photoPosts.sort(PhotoPostsList._compareDates);
        if (filterConfig === undefined) {
            return this._photoPosts.slice(skip, skip + top).sort(PhotoPostsList._compareDates);
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
        return result.slice(skip, skip + top);
    }


    get(id) {
        let post = this._photoPosts.find(item => item.id === id);
        if (post === null) {
            return false;
        }
        return post;
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
        let id = 0;
        for(let item of this._photoPosts){
            if(parseInt(item.id) > id){
                id = parseInt(item.id);
            }
        }
        photoPost.id = id + 1;
        photoPost.id += "";
        photoPost.likes = [];
        photoPost.createdAt = new Date();
        if (PhotoPostsList.validate(photoPost)) {
            this._photoPosts.push(photoPost);
            return true;
        }
        return false;
    }

    edit(id, photoPost) {
        if (!PhotoPostsList._checkChanges(photoPost)) {
            return false;
        }
        let oldPost = this.get(id);
        if (!oldPost) {
            return false;
        }
        if (photoPost.description !== undefined) {
            oldPost.description = photoPost.description;
        }
        if (photoPost.tags !== undefined) {
            oldPost.tags = photoPost.tags;
        }
        if (photoPost.photoLink !== undefined) {
            oldPost.photoLink = photoPost.photoLink;
        }
        return true;
    }

    remove(id) {
        if (parseInt(id) > 0) {
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

// console.log('photoPostsList.get(\'1\')');
// console.log(photoPostsList.get('1'));
//
// console.log('photoPostsList.get(\'sdadsasdadsa\')');
// console.log(photoPostsList.get('sdadsasdadsa'));
//
// console.log('photoPostsList.get(\'123123\')');
// console.log(photoPostsList.get('123123'));
//
// console.log('photoPostsList.get(\'{a:\'fdf\'}}\')');
// console.log(photoPostsList.get({a: 'fdf'}));
//
// console.log('photoPostsList.getPage()');
// console.log(photoPostsList.getPage());
//
// console.log('photoPostsList.getPage(10, 10)');
// console.log(photoPostsList.getPage(10, 10));
//
// console.log('photoPostsList.getPage(0, 10, {author: \'Witcher\'})');
// console.log(photoPostsList.getPage(0, 10, {author: 'Witcher'}))
//
// console.log('photoPostsList.getPage(0, 10, {author: \'Witcher\', tags: [\'Love\']})');
// console.log(photoPostsList.getPage(0, 10, {author: 'Witcher', tags: ['Love']}));
//
// console.log('photoPostsList.getPage(0, 10, {author: \'Witcher\', tags: [\'Love\', \'caTS\']})');
// console.log(photoPostsList.getPage(0, 10, {author: 'Witcher', tags: ['Love', 'caTS']}));
//
// console.log('photoPostsList.add({description: \'Hello, 16\', photoLink: \'images/example16\', tags:[\'JS\']})');
// console.log(photoPostsList.add({description: 'Hello, 16', photoLink: 'images/example16', tags: ['JS']}));
//
// console.log('photoPostsList.add({description: \'Hello, 16\',author: \'WindowsUser\', tags:[\'JS\']})');
// console.log(photoPostsList.add({description: 'Hello, 16', author: 'WindowsUser', tags: ['JS']}));
//
// console.log('photoPostsList.add({description: \'Hello, 16\',author: \'WindowsUser\',photoLink: \'images/example16\', tags:[\'JS\']})');
// console.log(photoPostsList.add({
//     description: 'Hello, 16',
//     author: 'WindowsUser',
//     photoLink: 'images/example16',
//     tags: ['JS']
// }));
//
// console.log('photoPostsList.get(21)');
// console.log(photoPostsList.get('21'));
//
// console.log('photoPostsList.remove(\'21\')');
// console.log(photoPostsList.remove('21'));
//
// console.log('photoPostsList.getPage(0,20)');
// console.log(photoPostsList.getPage(0, 20));
//
// console.log('photoPostsList.edit(\'1\',{description:{name:\'Vlad\'}})');
// console.log(photoPostsList.edit('1', {description: {name: 'Vlad'}}));
//
// console.log('photoPostsList.edit(\'1\',{photoLink: [\'Hello\', \'Andrey\']})');
// console.log(photoPostsList.edit('1', {photoLink: ['Hello', 'Andrey']}));
//
// console.log('photoPostsList.edit(\'1\',{tags: {}})');
// console.log(photoPostsList.edit('1', {tags: {}}));
//
// console.log('photoPostsList.edit(\'1\',{description: \'Hello JS\' ,tags:[\'Hello\', \'JS\']})');
// console.log(photoPostsList.edit('1', {description: 'Hello JS', tags: ['Hello', 'JS']}));
//
// console.log('photoPostsList.get(1)');
// console.log(photoPostsList.get('1'));
//
// console.log('photoPostsList.edit(\'1\',{photoLink: \'images/Hello_JS.jpg\'})');
// console.log(photoPostsList.edit('1', {photoLink: 'images/Hello_JS.jpg'}));
//
// console.log('photoPostsList.get(1)');
// console.log(photoPostsList.get('1'));
//
// console.log('photoPostsList.remove(\'1\')');
// console.log(photoPostsList.remove('1'));
//
// console.log('photoPostsList.remove(\'1\')');
// console.log(photoPostsList.remove('1'));
//
// console.log('photoPostsList.remove(\'123\')');
// console.log(photoPostsList.remove('123'));
//
// console.log('photoPostsList.remove(\'JS\')');
// console.log(photoPostsList.remove('JS'));
//
// console.log('photoPostsList.addAll([{\n' +
//     '        id: \'1\',\n' +
//     '        description: \'Hello, 1\',\n' +
//     '        createdAt: new Date(\'2018-01-23T23:00:00\'),\n' +
//     '        author: \'NewFag\',\n' +
//     '        photoLink: \'images/example1\',\n' +
//     '        tags: [\'Love\', \'Sleep\'],\n' +
//     '        likes: [\'NewFag\', "CatLover"],\n' +
//     '    },\n' +
//     '    {\n' +
//     '        id: \'2\',\n' +
//     '        description: \'Hello, 2\',\n' +
//     '        createdAt: new Date(\'2018-02-23T23:00:00\'),\n' +
//     '        author: \'OldFag\',\n' +
//     '        photoLink: \'images/example2\',\n' +
//     '        tags: [\'Hardcore\', \'Olds\', \'Like\'],\n' +
//     '        likes: [\'OldFag\', \'NewFag\', \'SonOfMom\'],\n' +
//     '    },\n' +
//     '    {\n' +
//     '        id: \'3\',\n' +
//     '        description: \'Hello, 3\',\n' +
//     '        createdAt: new Date(\'2018-03-23T23:00:00\'),\n' +
//     '        author: \'CatLover\',\n' +
//     '        photoLink: \'images/example3\',\n' +
//     '        tags: [\'Cats\', \'Sleep\', \'Like\'],\n' +
//     '        likes: [\'CatLover\', \'Pretty_Kitty\'],\n' +
//     '    }])');
// console.log(photoPostsList.addAll([{
//     id: '1',
//     description: 'Hello, 1',
//     createdAt: new Date('2018-01-23T23:00:00'),
//     author: 'NewFag',
//     photoLink: 'images/example1',
//     tags: ['Love', 'Sleep'],
//     likes: ['NewFag', "CatLover"],
// },
//     {
//         id: '2',
//         description: 'Hello, 2',
//         createdAt: new Date('2018-02-23T23:00:00'),
//         author: 'OldFag',
//         tags: ['Hardcore', 'Olds', 'Like'],
//         likes: ['OldFag', 'NewFag', 'SonOfMom'],
//     },
//     {
//         id: '3',
//         description: 'Hello, 3',
//         createdAt: new Date('2018-03-23T23:00:00'),
//         photoLink: 'images/example3',
//         tags: ['Cats', 'Sleep', 'Like'],
//         likes: ['CatLover', 'Pretty_Kitty'],
//     }]));
//
// console.log('photoPostList.clear()');
// photoPostsList.clear();
//
// console.log('photoPostList.getPage()');
// console.log(photoPostsList.getPage());