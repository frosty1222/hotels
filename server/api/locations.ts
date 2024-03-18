export default defineEventHandler(async (event) => {
    const packages: Array<Object> = [
        {
            id: 1,
            name: "California",
            services: [
                {
                    id: 1,
                    name: "Hotels",
                    total: 14,
                    path: "/"
                },
                {
                    id: 2,
                    name: "Tours",
                    total: 22,
                    path: "/"
                },
                {
                    id: 3,
                    name: "Rentals",
                    total: 25,
                    path: "/"
                },
                {
                    id: 4,
                    name: "Cars",
                    total: 25,
                    path: "/"
                },
                {
                    id: 5,
                    name: "Activities",
                    total: 18,
                    path: "/"
                }
            ],
            photo: "/images/California.jpg",
        },
        {
            id: 2,
            name: "New York City",
            services: [
                {
                    id: 6,
                    name: "Hotels",
                    total: 7,
                    path: "/"
                },
                {
                    id: 7,
                    name: "Tours",
                    total: 15,
                    path: "/"
                },
                {
                    id: 8,
                    name: "Rentals",
                    total: 25,
                    path: "/"
                },
                {
                    id: 9,
                    name: "Cars",
                    total: 22,
                    path: "/"
                },
                {
                    id: 10,
                    name: "Activities",
                    total: 18,
                    path: "/"
                }
            ],
            photo: "/images/New-York-City.jpg",
        },
        {
            id: 3,
            name: "New Jersey",
            services: [
                {
                    id: 11,
                    name: "Hotels",
                    total: 7,
                    path: "/"
                },
                {
                    id: 12,
                    name: "Tours",
                    total: 18,
                    path: "/"
                },
                {
                    id: 13,
                    name: "Rentals",
                    total: 11,
                    path: "/"
                },
                {
                    id: 14,
                    name: "Cars",
                    total: 14,
                    path: "/"
                },
                {
                    id: 15,
                    name: "Activities",
                    total: 17,
                    path: "/"
                }
            ],
            photo: "/images/New-Jersey.jpg",
        },
        {
            id: 4,
            name: "Los Angles",
            services: [
                {
                    id: 16,
                    name: "Hotels",
                    total: 7,
                    path: "/"
                },
                {
                    id: 17,
                    name: "Tours",
                    total: 18,
                    path: "/"
                },
                {
                    id: 18,
                    name: "Rentals",
                    total: 11,
                    path: "/"
                },
                {
                    id: 19,
                    name: "Cars",
                    total: 14,
                    path: "/"
                },
                {
                    id: 20,
                    name: "Activities",
                    total: 17,
                    path: "/"
                }
            ],
            photo: "/images/Los-Angeles.jpg",
        },
        {
            id: 5,
            name: "San Francisco",
            services: [
                {
                    id: 21,
                    name: "Hotels",
                    total: 7,
                    path: "/"
                },
                {
                    id: 22,
                    name: "Tours",
                    total: 18,
                    path: "/"
                },
                {
                    id: 23,
                    name: "Rentals",
                    total: 11,
                    path: "/"
                },
                {
                    id: 24,
                    name: "Cars",
                    total: 14,
                    path: "/"
                },
                {
                    id: 25,
                    name: "Activities",
                    total: 17,
                    path: "/"
                }
            ],
            photo: "/images/San-Francisco.jpg",
        },
        {
            id: 6,
            name: "Nevada",
            services: [
                {
                    id: 26,
                    name: "Hotels",
                    total: 7,
                    path: "/"
                },
                {
                    id: 27,
                    name: "Tours",
                    total: 18,
                    path: "/"
                },
                {
                    id: 28,
                    name: "Rentals",
                    total: 11,
                    path: "/"
                },
                {
                    id: 29,
                    name: "Cars",
                    total: 14,
                    path: "/"
                },
                {
                    id: 30,
                    name: "Activities",
                    total: 17,
                    path: "/"
                }
            ],
            photo: "/images/Nevada_.jpg",
        },
    ];

    const data = {
        status: 200,
        message: "ok",
        data: packages,
    }
    return data;
});