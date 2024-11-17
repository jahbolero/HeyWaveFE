import dayjs from 'dayjs';

import img1 from '@assets/products/p1.png';
import img2 from '@assets/products/p2.png';
import img3 from '@assets/products/p3.png';
import img4 from '@assets/products/p4.png';
import img5 from '@assets/products/p5.png';


import avatar1 from '@assets/products/avatar1.webp';
import avatar2 from '@assets/products/avatar2.webp';
import avatar3 from '@assets/products/avatar3.webp';
import avatar4 from '@assets/products/avatar4.webp';
import avatar5 from '@assets/products/avatar5.webp';

const all_items = [
    {
        id: 'item-1',
        author: {
            nickname: 'biniAiah',
            avatar: avatar1,
            isVerified: true,
        },
        image: img1,
        title: 'Bini Aiah',
        price: 0.08,
        qty: 1,
        available: 1,
        likes: 220,
        hot: dayjs().add(1, 'days'),
        categories: ['art', 'domain', 'collectibles'],
        statuses: ['offer', 'auction'],
        type: 'video',
    },
    {
        id: 'item-2',
        author: {
            nickname: 'pewdiepie',
            avatar: avatar2,
            isVerified: true,
        },
        image: img2,
        title: 'Pewdiepie',
        price: 1.1,
        qty: 1,
        available: 1,
        likes: 34,
        hot: dayjs().add({days: 1, hours: 12}),
        categories: ['music', 'sports', 'collectibles'],
        statuses: ['new'],
        type: 'img',
    },
    {
        id: 'item-3',
        author: {
            nickname: 'pacman',
            avatar: avatar3,
            isVerified: false,
        },
        image: img3,
        title: 'Manny Pacquiao',
        price: 0.114,
        qty: 1,
        available: 1,
        likes: 1124,
        hot: dayjs().add(12, 'days'),
        categories: ['photo'],
        statuses: ['new', 'now'],
        type: 'img',
    },
    {
        id: 'item-4',
        author: {
            nickname: 'oliviaRodrigo',
            avatar: avatar4,
            isVerified: true,
        },
        image: img4,
        title: 'Olivia Rodrigo',
        price: 19.9,
        qty: 2,
        available: 1,
        likes: 2358,
        hot: dayjs().add(26, 'days'),
        categories: ['photo', 'utility'],
        statuses: ['offer', 'auction'],
        type: '3d',
    },
    {
        id: 'item-5',
        author: {
            nickname: 'faker',
            avatar: avatar5,
            isVerified: false,
        },
        image: img5,
        title: 'Faker',
        price: 1.88,
        qty: 3,
        available: 1,
        likes: 168,
        hot: dayjs().add({days: 20, hours: 10}),
        categories: ['trading', 'virtual', 'art'],
        statuses: ['offer', 'auction'],
        type: 'img'
    }
]

export default all_items