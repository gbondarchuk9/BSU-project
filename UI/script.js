
 main = (function() {
    var photoPosts = [
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
            likes: ['CatLover','Pretty_Kitty'],
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
            likes: ['SonyBoy','Witcher'],
        },
        {
            id: '15',
            description: 'Hello, 15',
            createdAt: new Date('2018-12-26T23:00:00'),
            author: 'Javer',
            photoLink: 'images/example15',
            tags: ['BOX', 'PC', 'PS4'],
            likes: ['Javer','WindowsUser'],
        },
        {
            id: '16',
            description: 'Hello, 16',
            createdAt: new Date('2018-12-27T23:00:00'),
            author: 'WindowsUser',
            photoLink: 'images/example16',
            tags: ['PC', 'PS4', 'Games'],
            likes: ['Javer','WindowsUser'],
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
        },
        
    ]
    var compareDates = function(a,b){
        return b.createdAt - a.createdAt;
    }
    var checkChanges = function(photoPost){
        if(typeof(photoPost) == "object"){
            if(photoPost.description == undefined || typeof(photoPost.description) == "string" && photoPost.description.length <= 200){
                if(photoPost.tags == undefined || Array.isArray(photoPost.tags)){
                    if(Array.isArray(photoPost.tags)){
                        for(i = 0;i < photoPost.tags.length; i++){
                            if(!typeof(photoPost.tags[i]) == 'string'){
                                return false;
                            }
                        }
                    }
                    if(photoPost.photoLink == undefined || typeof(photoPost.photoLink) == "string"){
                        return true;
                    }
                    return false; 
                }
            }
        }
        return false; 
    }
    return{
        getPhotoPost: function(id){
            if(parseInt(id) > 0 && parseInt(id) && parseInt(id) <= photoPosts[photoPosts.length - 1].id){
                for(i = 0; i < photoPosts.length; i++){
                    if(photoPosts[i].id == id){
                        return photoPosts[i];
                    }
                }
            }
            return false;
        },
        getPhotoPosts: function(skip, top, filterConfig){
            skip = skip || 0;
            top = top || 10;
            if(filterConfig === undefined){
                return photoPosts.slice(skip, skip + top).sort(compareDates);
            }
            var result = photoPosts;
            if(filterConfig.author != undefined){
                result = result.filter(function(a){
                 return  a.author === filterConfig.author;
                });
            }
            if(filterConfig.dateUpLim instanceof Date){
                result = result.filter(function(a){
                    return a.createdAt <= filterConfig.dateUpLim;
                });
            }
            if(filterConfig.dateDownLim instanceof Date){
                result = result.filter(function(a){
                    return a.createdAt >= filterConfig.dateDownLim;
                });
            }
            if(filterConfig.tags != undefined){
                result = result.filter(function(a){
                    return filterConfig.tags.every(function(t){
                        for(i = 0; i < a.tags.length; i++){
                            if(a.tags[i].toLocaleLowerCase() === t.toLocaleLowerCase()){
                                return true;
                            }
                        }
                        return false;
                    })
                });
            }
            return result.slice(skip, skip + top).sort(compareDates);
        },
        validatePhotoPost: function(photoPost){
            if(typeof(photoPost) == 'object'){
                if(typeof(photoPost.photoLink) == 'string'){
                    if((typeof(photoPost.description) == 'string' && photoPost.description.length <= 200) ||
                     typeof(photoPost.description) == 'undefined'){
                        if(typeof(photoPost.author) == 'string'){
                            if(photoPost.createdAt instanceof Date){
                                if(typeof(photoPost.id == 'string') && parseInt(photoPost.id) > 0){
                                    if(Array.isArray(photoPost.tags)){
                                        for(i = 0;i < photoPost.tags.length; i++){
                                            if(!typeof(photoPost.tags[i]) == 'string'){
                                                return false;
                                            }
                                        }
                                        return true;   
                                    }
                                    return false;
                                }
                                return false;
                            }
                            return false;
                        }
                        return false;
                     }
                     return false;
                }
                return false;
            }
            return false;
        },
        addPhotoPost: function(photoPost){
            photoPost.id = parseInt(photoPosts[photoPosts.length - 1].id) + 1;
            photoPost.id += "";
            photoPost.likes = [];
            photoPost.createdAt = new Date();
            if(this.validatePhotoPost(photoPost)){
                photoPosts.push(photoPost);
                return true;
            }
            return false;            
        },
        removePhotoPost: function(id){
            if(parseInt(id) > 0 && parseInt(id) && parseInt(id) <= photoPosts[photoPosts.length - 1].id){
                for(i = 0; i < photoPosts.length; i++){
                    if(photoPosts[i].id == id){
                        photoPosts.splice(i,1);
                        return true;;
                    }
                }
            }
            return false;
        },
        getAllPhotoPosts: function(){
            return photoPosts;
        },
        editPhotoPost: function(id, photoPost){
            if(!checkChanges(photoPost)){
                return false;
            }
            if(parseInt(id) > 0 && parseInt(id) && parseInt(id) <= photoPosts[photoPosts.length - 1].id){
                for(i = 0; i < photoPosts.length; i++){
                    if(photoPosts[i].id == id){
                            if(photoPost.description != undefined){
                                photoPosts[i].description = photoPost.description;
                            }
                            if(photoPost.tags != undefined){
                                photoPosts[i].tags = photoPost.tags;
                            }
                            if(photoPost.photoLink != undefined){
                                photoPosts[i].photoLink = photoPost.photoLink; 
                            }                
                            return true;
                    }
                }
            }
            return false;
        }
    }
}());
console.log('getPhotoPost(\'1\')');
console.log(main.getPhotoPost('1'));

console.log('getPhotoPost(\'sdadsasdadsa\')');
console.log(main.getPhotoPost('sdadsasdadsa'));

console.log('getPhotoPost(\'123123\')');
console.log(main.getPhotoPost('123123'));

console.log('getPhotoPost(\'{a:\'fdf\'}}\')');
console.log(main.getPhotoPost({a:'fdf'}));

console.log('getPhotoPost()');
console.log(main.getPhotoPosts());

console.log('main.getPhotoPosts(10, 10)');
console.log(main.getPhotoPosts(10, 10));

console.log('getPhotoPosts(0, 10, {author: \'Witcher\'})');
console.log(main.getPhotoPosts(0, 10, {author: 'Witcher'}))

console.log('getPhotoPosts(0, 10, {author: \'Witcher\', tags: [\'Love\']})');
console.log(main.getPhotoPosts(0, 10, {author: 'Witcher', tags: ['Love']}));

console.log('getPhotoPosts(0, 10, {author: \'Witcher\', tags: [\'Love\', \'caTS\']})');
console.log(main.getPhotoPosts(0, 10, {author: 'Witcher', tags: ['Love', 'caTS']}));

console.log('addPhotoPost({description: \'Hello, 16\', photoLink: \'images/example16\', tags:[\'JS\']})');
console.log(main.addPhotoPost({description: 'Hello, 16', photoLink: 'images/example16', tags:['JS']}));

console.log('addPhotoPost({description: \'Hello, 16\',author: \'WindowsUser\', tags:[\'JS\']})');
console.log(main.addPhotoPost({description: 'Hello, 16',author: 'WindowsUser', tags:['JS']}));

console.log('addPhotoPost({description: \'Hello, 16\',author: \'WindowsUser\',photoLink: \'images/example16\', tags:[\'JS\']})');
console.log(main.addPhotoPost({description: 'Hello, 16',author: 'WindowsUser',photoLink: 'images/example16', tags:['JS']}));

console.log('getPhotoPost(21)');
console.log(main.getPhotoPost('21'));

console.log('main.removePhotoPost(\'21\')');
console.log(main.removePhotoPost('21'));

console.log('main.getPhotoPosts(0,20)');
console.log(main.getPhotoPosts(0,20));

console.log('main.editPhotoPost(\'1\',{description:{name:\'Vlad\'}})');
console.log(main.editPhotoPost('1',{description:{name:'Vlad'}}));

console.log('main.editPhotoPost(\'1\',{photoLink: [\'Hello\', \'Andrey\']})');
console.log(main.editPhotoPost('1',{photoLink: ['Hello', 'Andrey']}));

console.log('main.editPhotoPost(\'1\',{tags: {}})');
console.log(main.editPhotoPost('1',{tags:{}}));

console.log('main.editPhotoPost(\'1\',{description: \'Hello JS\' ,tags:[\'Hello\', \'JS\']})');
console.log(main.editPhotoPost('1',{description: 'Hello JS',tags:['Hello', 'JS']}));

console.log('getPhotoPost(1)');
console.log(main.getPhotoPost('1'));

console.log('main.editPhotoPost(\'1\',{photoLink: \'images/Hello_JS.jpg\'})');
console.log(main.editPhotoPost('1',{photoLink: 'images/Hello_JS.jpg'}));

console.log('getPhotoPost(1)');
console.log(main.getPhotoPost('1'));

console.log('main.removePhotoPost(\'1\')');
console.log(main.removePhotoPost('1'));

console.log('main.removePhotoPost(\'1\')');
console.log(main.removePhotoPost('1'));

console.log('main.removePhotoPost(\'123\')');
console.log(main.removePhotoPost('123'));

console.log('main.removePhotoPost(\'JS\')');
console.log(main.removePhotoPost('JS'));