/*global document*/

/*global main*/
class View {
    static _setSpans(postNode, photoPost) {
        let spans = postNode.querySelectorAll('span');
        spans[0].innerHTML = photoPost.author;
        spans[1].innerHTML = View._createdAtToString(photoPost.createdAt);
        spans[2].innerHTML = photoPost.likes.length;
    }

    static _setDivs(postNode, photoPost) {
        let divs = postNode.querySelectorAll('div');
        divs[0].setAttribute('id', photoPost.id);
        divs[1].innerHTML = photoPost.description;
        for (let item of photoPost.tags) {
            divs[2].innerHTML += "#" + item;
        }
    }

    static _setImage(postNode, photoPost, userName) {
        let images = postNode.querySelectorAll('img');
        images[2].setAttribute('src', photoPost.photoLink);
        if (photoPost.likes.indexOf(userName) !== -1) {
            images[3].setAttribute('src', 'images/red-heart.png');
        }
    }

    static _setButtons(postNode, photoPost, userName) {
        let buttons = postNode.querySelectorAll('button');
        let likeButton = buttons[2];
        let deleteButton = buttons[1];
        let editButton = buttons[0];
        if (userName !== '') {
            likeButton.onclick = function () {
                main.likePhotoPost(photoPost);
            };
            if (userName === photoPost.author) {
                deleteButton.setAttribute('style', 'display: block');
                editButton.setAttribute('style', 'display: block');
                deleteButton.onclick = function () {
                    View.showDeleteWindow(photoPost.id);
                };
                editButton.onclick = function () {
                    View.showEditWindow(photoPost.id);
                }
            }
        }
    }

    static _createPostNode(photoPost, userName) {
        let tmpl = document.querySelector('#post-template');
        let postNode = tmpl.content.cloneNode(true);
        View._setSpans(postNode, photoPost);
        View._setImage(postNode, photoPost, userName);
        View._setDivs(postNode, photoPost);
        View._setButtons(postNode, photoPost, userName);
        return postNode;
    }

    static showPost(photoPost, userName) {
        document.getElementsByTagName('main')[0].appendChild(View._createPostNode(photoPost, userName));
    }

    static removePost(id) {
        let node = document.getElementById(id);
        let main = document.getElementsByTagName('main')[0];
        if (node !== null) {
            main.removeChild(node);
        }
    }

    static _createdAtToString(createdAt) {
        let result = '';
        if (createdAt.getHours() < 10) {
            result += '0'
        }
        result += createdAt.getHours() + ':';
        if (createdAt.getMinutes() < 10) {
            result += '0';
        }
        result += createdAt.getMinutes() + '<br>';
        if (createdAt.getDate() < 10) {
            result += '0';
        }
        result += createdAt.getDate() + ':';
        if (createdAt.getMonth() < 9) {
            result += '0';
        }
        result += (createdAt.getMonth() + 1) + ':' + createdAt.getFullYear();
        return result;
    }

    static replacePost(photoPost, userName) {
        let main = document.getElementsByTagName('main')[0];
        let node = document.getElementById(photoPost.id);
        if (node !== null) {
            main.replaceChild(View._createPostNode(photoPost, userName), node);
        }
    }

    static clear() {
        let main = document.getElementsByTagName('main')[0];
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    }

    static printMessage(templateId) {
        let tmpl = document.querySelector(templateId);
        let postNode = tmpl.content.cloneNode(true);
        document.getElementsByTagName('main')[0].appendChild(postNode);
    }

    static showGuestHeader() {
        let tmpl = document.querySelector('#guest-header-menu-template');
        let node = tmpl.content.cloneNode(true);
        let header = document.getElementsByTagName('header')[0];
        header.innerHTML = '';
        header.appendChild(node);
    }

    static showUserHeader(userName) {
        let tmpl = document.querySelector('#user-header-menu-template');
        let node = tmpl.content.cloneNode(true);
        node.querySelectorAll('span')[0].innerHTML = userName;
        let header = document.getElementsByTagName('header')[0];
        header.innerHTML = '';
        header.appendChild(node);
    }

    static hideFuncButtons() {
        let editButtons = document.getElementsByClassName('edit-button');
        for (let item of editButtons) {
            item.setAttribute('style', 'display: none');
        }
        let deleteButtons = document.getElementsByClassName('delete-button');
        for (let item of deleteButtons) {
            item.setAttribute('style', 'display: none');
        }
    }

    static showAddButton() {
        let button = document.getElementsByClassName('add-button')[0];
        button.setAttribute('style', 'display: relative');
    }

    static hideAddButton() {
        let button = document.getElementsByClassName('add-button')[0];
        button.setAttribute('style', 'display: none');
    }

    static showAuthorHint(authorList) {
        let dataList = document.getElementById('search-line-author');
        for (let item of authorList) {
            let option = document.createElement('option');
            option.innerHTML = item;
            dataList.appendChild(option);
        }
    }

    static showAddWindow() {
        let windowNode = document.getElementsByClassName('add-window')[0];
        windowNode.setAttribute('style', 'display: block');
        document.getElementsByClassName('close-add-window-button')[0].addEventListener('click', View.closeAddWindow);
        document.getElementsByClassName('apply-add-window-button')[0].addEventListener('click', main.addPhotoPost);
    }

    static closeAddWindow() {
        let windowNode = document.getElementsByClassName('add-window')[0];
        let windowForm = document.getElementsByClassName('add-window-form')[0];
        windowForm.elements.photoLink.value = '';
        windowForm.elements.description.value = '';
        windowForm.elements.tags.value = '';
        windowNode.setAttribute('style', 'display: none');
    }

    static setPostAuthor(author) {
        document.getElementsByClassName('post-author')[0].innerHTML = author;
        document.getElementsByClassName('post-author')[1].innerHTML = author;
    }

    static getAddedPhotoPost() {
        let photoPost = {};
        let addForm = document.getElementsByClassName('add-window-form')[0];
        photoPost.photoLink = addForm.elements.photoLink.value;
        photoPost.description = addForm.elements.description.value;
        photoPost.tags = addForm.elements.tags.value;
        return photoPost;
    }

    static getFilterConfig() {
        let searchForm = document.getElementsByClassName('search-form')[0];
        let author = searchForm.elements.author.value;
        let dateDownLim = searchForm.elements.from.value;
        let dateUpLim = searchForm.elements.to.value;
        let tags = searchForm.elements.tags.value;
        return {
            author: author,
            dateDownLim: new Date(dateDownLim),
            dateUpLim: new Date(dateUpLim),
            tags: tags,
        };
    }

    static showDeleteWindow(id) {
        document.getElementsByClassName('delete-window')[0].setAttribute('style', 'display: block');
        document.getElementsByClassName('yes-delete-button')[0].addEventListener('click', function () {
            main.removePhotoPost(id);
            View.closeDeleteWindow();
        });
        document.getElementsByClassName('no-delete-button')[0].addEventListener('click', View.closeDeleteWindow);
    }

    static closeDeleteWindow() {
        document.getElementsByClassName('delete-window')[0].setAttribute('style', 'display: none');
    }

    static showLogInWindow() {
        document.getElementsByClassName('login-window')[0].setAttribute('style', 'display: block');
    }

    static closeLogInWindow() {
        document.getElementsByClassName('login-window')[0].setAttribute('style', 'display: none');
        let loginWindow = document.getElementsByClassName('login-window-form')[0];
        loginWindow.elements.login.value = '';
        loginWindow.elements.password.value = '';
    }

    static getLogin() {
        return document.getElementsByClassName('login-window-form')[0].elements.login.value;
    }

    static showEditWindow(id) {
        document.getElementsByClassName('edit-window')[0].setAttribute('style', 'display: block');
        View._setEditForm(id);
        document.getElementsByClassName('apply-edit-window-button')[0].addEventListener('click', function () {
            main.editPhotoPost(id, View._getEditForm());
        });
        document.getElementsByClassName('close-edit-window-button')[0].addEventListener('click', View.closeEditWindow);
    }

    static closeEditWindow() {
        document.getElementsByClassName('edit-window')[0].setAttribute('style', 'display: none');
    }

    static _setEditForm(id) {
        let photoPost = main.getPhotoPost(id);
        let editForm = document.getElementsByClassName('edit-window-form')[0];
        editForm.elements.description.value = photoPost.description;
        editForm.elements.photoLink.value = photoPost.photoLink;
        editForm.elements.tags.value = photoPost.tags.join('#');
    }

    static _getEditForm() {
        let photoPost = {};
        let editForm = document.getElementsByClassName('edit-window-form')[0];
        photoPost.description = editForm.elements.description.value;
        photoPost.photoLink = editForm.elements.photoLink.value;
        photoPost.tags = editForm.elements.tags.value;
        let tagsArr = photoPost.tags.split('#');
        tagsArr.splice(0, 1);
        photoPost.tags = tagsArr;
        return photoPost;
    }
    static showLoadMoreButton(){
        let tmpl = document.querySelector('#load-more-button-template');
        let buttonNode = tmpl.content.cloneNode(true);
        document.getElementsByTagName('main')[0].appendChild(buttonNode);
        document.getElementsByClassName('load-more-button')[0].addEventListener('click',main.loadMore);
    }
}
