class PhotoPostsList {
    constructor(photoPosts) {
        this._photoPosts = photoPosts;
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
        if (filterConfig.author !== undefined && filterConfig.author !== '') {
            result = result.filter(function (a) {
                return a.author === filterConfig.author;
            });
        }
        if (filterConfig.dateUpLim instanceof Date && filterConfig.dateUpLim != 'Invalid Date') {
            result = result.filter(function (a) {
                return a.createdAt <= filterConfig.dateUpLim;
            });
        }
        if (filterConfig.dateDownLim instanceof Date && filterConfig.dateDownLim != 'Invalid Date') {
            result = result.filter(function (a) {
                return a.createdAt >= filterConfig.dateDownLim;
            });
        }
        if (filterConfig.tags !== undefined && filterConfig.tags !== '') {
            let tagsArr = filterConfig.tags.split('#');
            tagsArr.splice(0, 1);
            result = result.filter(function (a) {
                return tagsArr.every(function (t) {
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
        for (let item of this._photoPosts) {
            if (parseInt(item.id) > id) {
                id = parseInt(item.id);
            }
        }
        photoPost.id = id + 1;
        photoPost.id += "";
        photoPost.likes = [];
        photoPost.createdAt = new Date();
        let tagsArr = photoPost.tags.split('#');
        tagsArr.splice(0, 1);
        photoPost.tags = tagsArr;
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

    getAuthorList() {
        let authorList = new Set();
        for (let item of this._photoPosts) {
            authorList.add(item.author);
        }
        return authorList;
    }

}