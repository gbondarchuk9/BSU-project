let main = (function () {
    let photoPostsList = new PhotoPostsList([
        {
            id: '1',
            description: 'Hello, 1',
            createdAt: new Date('2018-01-23T23:00:00'),
            author: 'NewFag',
            photoLink: 'images/example1.jpg',
            tags: ['Love', 'Sleep'],
            likes: ['NewFag', "CatLover"],
        },
        {
            id: '2',
            description: 'Hello, 2',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'OldFag',
            photoLink: 'images/example2.jpg',
            tags: ['Hardcore', 'Olds', 'Like'],
            likes: ['OldFag', 'NewFag', 'SonOfMom'],
        },
        {
            id: '3',
            description: 'Hello, 3',
            createdAt: new Date('2018-03-23T23:00:00'),
            author: 'CatLover',
            photoLink: 'images/example3.jpg',
            tags: ['Cats', 'Sleep', 'Like'],
            likes: ['CatLover', 'Pretty_Kitty'],
        },
        {
            id: '4',
            description: 'Hello, 4',
            createdAt: new Date('2018-04-23T23:00:00'),
            author: 'SonOfMum',
            photoLink: 'images/example4.jpg',
            tags: ['Cats', 'Sleep'],
            likes: ['SonOfMum', 'Mum'],
        },
        {
            id: '5',
            description: 'Hello, 5',
            createdAt: new Date('2018-05-23T23:00:00'),
            author: 'Witcher',
            photoLink: 'images/example5.jpg',
            tags: ['Love', 'Sleep', 'Cats'],
            likes: ['Witcher', 'OldFag'],
        },
        {
            id: '6',
            description: 'Hello, 6',
            createdAt: new Date('2018-06-23T23:00:00'),
            author: 'Witcher',
            photoLink: 'images/example6.jpg',
            tags: ['Love', 'Like', 'Sleep'],
            likes: ['Witcher', 'OldFag'],
        },
        {
            id: '7',
            description: 'Hello, 7',
            createdAt: new Date('2018-07-23T23:00:00'),
            author: 'OldFag',
            photoLink: 'images/example7.jpg',
            tags: ['Love', 'Cats', 'Sleep', 'Like'],
            likes: ['NewFag', 'OldFag'],
        },
        {
            id: '8',
            description: 'Hello, 8',
            createdAt: new Date('2018-08-23T23:00:00'),
            author: 'CatLover',
            photoLink: 'images/example8.jpg',
            tags: ['Spiders'],
            likes: ['NewFag', 'CatLover'],
        },
        {
            id: '9',
            description: 'Hello, 9',
            createdAt: new Date('2018-09-23T23:00:00'),
            author: 'NewFag',
            photoLink: 'images/example9.jpg',
            tags: ['Animals'],
            likes: ['CatLover', 'WindowsUser'],
        },
        {
            id: '10',
            description: 'Hello, 10',
            createdAt: new Date('2018-10-23T23:00:00'),
            author: 'Witcher',
            photoLink: 'images/example10.jpg',
            tags: ['Spiders', 'Animals'],
            likes: ['Witcher', 'NewFag', 'OldFag'],
        },
        {
            id: '11',
            description: 'Hello, 11',
            createdAt: new Date('2018-11-23T23:00:00'),
            author: 'SonOfMum',
            photoLink: 'images/example11.jpg',
            tags: ['Sony', 'Nintendo', 'Sega'],
            likes: ['SonyBoy', 'Mario'],
        },
        {
            id: '12',
            description: 'Hello, 12',
            createdAt: new Date('2018-12-23T23:00:00'),
            author: 'JSer',
            photoLink: 'images/example12.jpg',
            tags: ['Nintendo', 'Sega', 'Sony'],
            likes: ['WindowsUser', 'NewFag', 'OldFag', 'JSer'],
        },
        {
            id: '13',
            description: 'Hello, 13',
            createdAt: new Date('2018-12-24T23:00:00'),
            author: 'JSer',
            photoLink: 'images/example13.jpg',
            tags: ['Sony', 'Microsoft'],
            likes: ['Javer', 'JSer'],
        },
        {
            id: '14',
            description: 'Hello, 14',
            createdAt: new Date('2018-12-25T23:00:00'),
            author: 'Javer',
            photoLink: 'images/example14.jpg',
            tags: ['XBOX', 'XBOXONE', 'GodOfWar'],
            likes: ['SonyBoy', 'Witcher'],
        },
        {
            id: '15',
            description: 'Hello, 15',
            createdAt: new Date('2018-12-26T23:00:00'),
            author: 'Javer',
            photoLink: 'images/example15.jpg',
            tags: ['BOX', 'PC', 'PS4'],
            likes: ['Javer', 'WindowsUser'],
        },
        {
            id: '16',
            description: 'Hello, 16',
            createdAt: new Date('2018-12-27T23:00:00'),
            author: 'WindowsUser',
            photoLink: 'images/example16.jpg',
            tags: ['PC', 'PS4', 'Games'],
            likes: ['Javer', 'WindowsUser'],
        },
        {
            id: '17',
            description: 'Hello, 17',
            createdAt: new Date('2018-12-28T23:00:00'),
            author: 'WindowsUser',
            photoLink: 'images/example17.jpg',
            tags: ['Sport', 'Football'],
            likes: ['WindowsUser', "PC_LOver"],
        },
        {
            id: '18',
            description: 'Hello, 18',
            createdAt: new Date('2017-12-30T12:35:00'),
            author: 'CatLover',
            photoLink: 'images/example18.jpg',
            tags: ['Kitten', 'Kittens', 'Cats'],
            likes: [''],
        },
        {
            id: '19',
            description: 'Hello, 19',
            createdAt: new Date('2018-12-29T23:00:00'),
            author: 'OldFag',
            photoLink: 'images/example19.jpg',
            tags: ['Gym'],
            likes: ['NewFag', 'OldFag'],
        },

        {
            id: '20',
            description: 'Hello, 20',
            createdAt: new Date('2017-12-30T12:35:00'),
            author: 'GalaxyMan',
            photoLink: 'images/example20.jpg',
            tags: ['Sport', 'Gym'],
            likes: ['GalaxyMan'],
        },

    ]);
    let userName = '';
    let lastFilterConfig;

    return {
        showPhotoPosts(skip = 0, top = 10, filterConfig) {
            View.clear();
            let photoPosts = photoPostsList.getPage(skip, top, filterConfig);
            if (photoPosts.length === 0) {
                View.clear();
                View.printMessage('#posts-not-found-template');
            } else {
                lastFilterConfig = filterConfig;
                for (let item of photoPosts) {
                    View.showPost(item, userName);
                }
                if (userName === '') {
                    View.hideFuncButton();
                }
            }
        },
        addPhotoPost(photoPost) {
            if (userName !== '') {
                photoPost.author = userName;
                if (photoPostsList.add(photoPost)) {
                    this.showPhotoPosts(0, 10, lastFilterConfig);
                    return true;
                }
            }
            return false;
        },
        removePhotoPost(id) {
            if (userName !== '') {
                if (photoPostsList.remove(id)) {
                    View.removePost(id);
                    this.showPhotoPosts(0, 10, lastFilterConfig);
                    return true;
                }
            }

            return false;
        },
        editPhotoPost(id, photoPost) {
            if (userName !== '') {
                if (photoPostsList.edit(id, photoPost)) {
                    View.replacePost(photoPostsList.get(id), userName);
                    return true;
                }
            }
            return false;
        },
        logIn(login) {
            if (login !== '') {
                userName = login;
                View.showUserHeader(userName);
                View.showFuncButton();
                View.showAddButton();
                this.showPhotoPosts(0, 10, lastFilterConfig);
                return true;
            }
            return false;
        },
        logOut() {
            if (userName !== '') {
                userName = '';
                View.showGuestHeader();
                View.hideAddButton();
                this.showPhotoPosts(0, 10, lastFilterConfig);
                View.hideFuncButton();
                return true;
            }
            return false;
        },
        likePhotoPost(id) {
            if (userName !== '') {
                let post = photoPostsList.get(id);
                let index = post.likes.indexOf(userName);
                if (index === -1) {
                    post.likes.push(userName);
                } else {
                    post.likes.splice(index, 1);
                }
                View.replacePost(photoPostsList.get(id), userName);
                return true;
            }
            return false;
        }
    }
}());
console.log('logIn(\'OldFag\')');
main.logIn('OldFag');
console.log('({description: \'Hello, 1\',\n' +
    '    photoLink: \'images/example1.jpg\',\n' +
    '    tags: [\'Love\', \'Sleep\'],})');
main.addPhotoPost({description: 'Hello, 1',
    photoLink: 'images/example1.jpg',
    tags: ['Love', 'Sleep'],});
console.log('editPhotoPost(\'19\',{description:"Hi Guys", tags:["Js","JavaScript"]})');
main.editPhotoPost('19',{description:"Hi Guys", tags:["Js","JavaScript"]});
console.log('likePhotoPost(\'21\')');
main.likePhotoPost('21');
console.log('removePhotoPost(\'17\')');
main.removePhotoPost('17');