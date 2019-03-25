/*global document*/
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
        images[1].setAttribute('src', photoPost.photoLink);
        if (photoPost.likes.indexOf(userName) !== -1) {
            images[2].setAttribute('src', 'images/red-heart.png');
        }
    }

    static _createPostNode(photoPost, userName) {
        let tmpl = document.querySelector('#post-template');
        let postNode = tmpl.content.cloneNode(true);
        View._setSpans(postNode, photoPost);
        View._setImage(postNode, photoPost, userName);
        View._setDivs(postNode, photoPost);
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
        if(node !== null){
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

    static hideFuncButton() {
        let buttons = document.getElementsByClassName('func-button');
        for (let item of buttons) {
            item.setAttribute('style', 'display: none');
        }
    }

    static showFuncButton() {
        let buttons = document.getElementsByClassName('func-button');
        for (let item of buttons) {
            item.setAttribute('style', 'display: relative');
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

}
