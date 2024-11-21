import avatar from '@assets/avatar.webp';
import img1 from '@assets/author/1.webp';
import img2 from '@assets/author/2.webp';
import img3 from '@assets/author/3.webp';


const owner = {
    nickname: 'ventuniconeymon',
    avatar: avatar,
    isVerified: true,
}

const author = {
    creations: [
        {
            id: 'creation-1',
            image: img1,
            title: 'Singing Session',
            author: owner,
            price: 3,
            qty: 1,
            available: 1,
            likes: 168,
            isLiked: false,
        },
        {
            id: 'creation-2',
            image: img2,
            title: 'Video Chat for Charity',
            author: owner,
            price: 0.12,
            qty: 4,
            available: 1,
            likes: 380,
            isLiked: false,
        },
        {
            id: 'creation-3',
            image: img3,
            title: 'Minecraft with me',
            author: owner,
            price: 0.941,
            qty: 2,
            available: 1,
            likes: 15,
            isLiked: true,
        },
    ],
    collections: [
        
    ]
};

export default author