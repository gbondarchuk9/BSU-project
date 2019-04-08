/*global document*/
/*global View*/
/*global PhotoPostsList*/
/*global localStorage*/
let main = (function () {
    let photoPostsList;
    let userName = '';
    let lastFilterConfig;
    let pageNumber = 1;
    return {
        getPhotoPost(id) {
            return photoPostsList.get(id);
        },
        showPhotoPosts() {
            View.clear();
            pageNumber = 1;
            let filterConfig = View.getFilterConfig();
            let photoPosts = photoPostsList.getPage(0, 10, filterConfig);
            if (photoPosts.length === 0) {
                View.clear();
                View.printMessage('#posts-not-found-template');
            } else {
                lastFilterConfig = filterConfig;
                photoPosts.forEach(item => View.showPost(item, userName));
                if (photoPosts.length === 10 && photoPostsList.getPage(10, 1, filterConfig).length === 1) {
                    View.showLoadMoreButton();
                }
                if (userName === '') {
                    View.hideFuncButtons();
                }
            }
        },
        loadMore() {
            let loadMoreButton = document.getElementsByClassName('load-more-button')[0];
            document.getElementsByTagName('main')[0].removeChild(loadMoreButton);
            let photoPosts = photoPostsList.getPage(pageNumber * 10, 10, lastFilterConfig);
            photoPosts.forEach(item => View.showPost(item, userName));
            if (photoPosts.length === 10 && photoPostsList.getPage(++pageNumber * 10, 1, lastFilterConfig).length === 1) {
                View.showLoadMoreButton();
            }
        },
        addPhotoPost() {
            let photoPost = View.getAddedPhotoPost();
            if (userName !== '') {
                photoPost.author = userName;
                if (photoPostsList.add(photoPost)) {
                    main.showPhotoPosts(lastFilterConfig);
                    View.closeAddWindow();
                    main.save();
                }
            }
        },
        removePhotoPost(id) {
            if (userName !== '' && photoPostsList.get(id).author === userName) {
                if (photoPostsList.remove(id)) {
                    View.removePost(id);
                    main.showPhotoPosts(lastFilterConfig);
                    main.save();
                }
            }
        },
        editPhotoPost(id, photoPost) {
            if (userName !== '' && photoPostsList.get(id).author === userName) {
                if (photoPostsList.edit(id, photoPost)) {
                    View.replacePost(photoPostsList.get(id), userName);
                    View.closeEditWindow();
                    main.save();
                }
            }
        },
        likePhotoPost(photoPost) {
            if (userName !== '') {
                let index = photoPost.likes.indexOf(userName);
                if (index === -1) {
                    photoPost.likes.push(userName);
                } else {
                    photoPost.likes.splice(index, 1);
                }
                View.replacePost(photoPost, userName);
                main.save();
            }
        },
        logIn() {
            let login = View.getLogin();
            if (login !== '') {
                userName = login;
                View.closeLogInWindow();
                View.showUserHeader(userName);
                View.showAddButton();
                document.getElementsByClassName('add-button')[0].addEventListener('click', View.showAddWindow);
                document.getElementsByClassName('logout-button')[0].addEventListener('click', main.logOut);
                View.setPostAuthor(userName);
                main.showPhotoPosts(lastFilterConfig);
                return true;
            }
            return false;
        },
        logOut() {
            userName = '';
            View.showGuestHeader();
            View.hideAddButton();
            main.showPhotoPosts(lastFilterConfig);
            View.hideFuncButtons();
            document.getElementsByClassName('logout-button')[0].addEventListener('click', View.showLogInWindow);
            document.getElementsByClassName('close-login-window-button')[0].addEventListener('click', View.closeLogInWindow);
            document.getElementsByClassName('login-button')[0].addEventListener('click', main.logIn);
        },
        save() {
            localStorage.removeItem('pPL');
            localStorage.setItem('pPL', JSON.stringify(photoPostsList._photoPosts));
        },
        restore() {
            let pPL = JSON.parse(localStorage.getItem('pPL'));
            if (pPL === null) {
                photoPostsList = new PhotoPostsList([
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
            } else {
                pPL.forEach(item => item.createdAt = new Date(item.createdAt));
                photoPostsList = new PhotoPostsList(pPL);
            }

        },
        start() {
            main.restore();
            View.showAuthorHint(photoPostsList.getAuthorList());
            document.getElementsByClassName('search-button')[0].addEventListener('click', main.showPhotoPosts);
            main.logOut();
        },

    }
}());
main.start();
