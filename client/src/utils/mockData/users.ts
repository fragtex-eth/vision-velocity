let users = {
    1: {
        name: "Mike Mueller",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/MikeMueller",
            x: "www.x.com/MikeMueller",
            linkedin: "www.linkedin.com/MikeMueller",
            walletAddress: "0x465464678787336745463"
        },
        description: "Passionate about tech and startups. Always on the lookout for innovative ideas.",
        projects: [1],
        investments: [2, 3]
    },
    2: {
        name: "Sarah Johnson",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/SarahJohnson",
            x: "www.x.com/SarahJohnson",
            linkedin: "www.linkedin.com/SarahJohnson",
            walletAddress: "0x864546467878733674563"
        },
        description: "Digital enthusiast with a penchant for media projects. Love to collaborate.",
        projects: [2, 3],
        investments: [4, 5]
    },
    3: {
        name: "Tom Davidson",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/TomDavidson",
            x: "www.x.com/TomDavidson",
            linkedin: "www.linkedin.com/TomDavidson",
            walletAddress: "0x973546467878733678563"
        },
        description: "Adventurous spirit with a focus on nature and sustainability.",
        projects: [4],
        investments: [5, 6, 7]
    },
    4: {
        name: "Linda Smith",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/LindaSmith",
            x: "www.x.com/LindaSmith",
            linkedin: "www.linkedin.com/LindaSmith",
            walletAddress: "0x583546467878733658593"
        },
        description: "Professional musician, keen on exploring digital platforms to expand reach.",
        projects: [5],
        investments: [8, 9]
    },
    5: {
        name: "David Green",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/DavidGreen",
            x: "www.x.com/DavidGreen",
            linkedin: "www.linkedin.com/DavidGreen",
            walletAddress: "0x123456789012345678901"
        },
        description: "A guitar enthusiast turned tutor. Sharing my love for music through tutorials.",
        projects: [6],
        investments: [1, 7, 10]
    },
    6: {
        name: "Anna Bell",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/AnnaBell",
            x: "www.x.com/AnnaBell",
            linkedin: "www.linkedin.com/AnnaBell",
            walletAddress: "0x223456789012345678902"
        },
        description: "Exploring ambient sounds to create something unique and mystic.",
        projects: [7],
        investments: [8, 2]
    },
    7: {
        name: "Carlos Mendoza",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/CarlosMendoza",
            x: "www.x.com/CarlosMendoza",
            linkedin: "www.linkedin.com/CarlosMendoza",
            walletAddress: "0x323456789012345678903"
        },
        description: "Fitness enthusiast advocating for a healthy lifestyle through virtual platforms.",
        projects: [8],
        investments: [3, 4, 5]
    },
    8: {
        name: "Beatrice Lui",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/BeatriceLui",
            x: "www.x.com/BeatriceLui",
            linkedin: "www.linkedin.com/BeatriceLui",
            walletAddress: "0x423456789012345678904"
        },
        description: "Tech-savvy and a lover of all things virtual reality.",
        projects: [9],
        investments: [6]
    },
    9: {
        name: "Ella Fitzgerald",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/EllaFitzgerald",
            x: "www.x.com/EllaFitzgerald",
            linkedin: "www.linkedin.com/EllaFitzgerald",
            walletAddress: "0x523456789012345678905"
        },
        description: "Crafting is my passion, and I love teaching others through digital mediums.",
        projects: [10],
        investments: [7, 8, 9]
    },
    10: {
        name: "Frank Sinatra",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/FrankSinatra",
            x: "www.x.com/FrankSinatra",
            linkedin: "www.linkedin.com/FrankSinatra",
            walletAddress: "0x623456789012345678906"
        },
        description: "A tech geek with an eye for the latest gadgets and innovations.",
        projects: [11],
        investments: [1, 2, 3, 4]
    },    
    11: {
        name: "Grace Hopper",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/GraceHopper",
            x: "www.x.com/GraceHopper",
            linkedin: "www.linkedin.com/GraceHopper",
            walletAddress: "0x723456789012345678907"
        },
        description: "A pioneer in computer programming, with a focus on compiler design.",
        projects: [12],
        investments: [5, 8, 9]
    },
    12: {
        name: "Alan Turing",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/AlanTuring",
            x: "www.x.com/AlanTuring",
            linkedin: "www.linkedin.com/AlanTuring",
            walletAddress: "0x823456789012345678908"
        },
        description: "Mathematical genius with a penchant for cryptography and theoretical computation.",
        projects: [13],
        investments: [6, 10, 12]
    },
    13: {
        name: "Marilyn Monroe",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/MarilynMonroe",
            x: "www.x.com/MarilynMonroe",
            linkedin: "www.linkedin.com/MarilynMonroe",
            walletAddress: "0x923456789012345678909"
        },
        description: "A lover of arts and the golden age of Hollywood. Exploring new-age cinema techniques.",
        projects: [14],
        investments: [11, 15]
    },
    14: {
        name: "Nikola Tesla",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/NikolaTesla",
            x: "www.x.com/NikolaTesla",
            linkedin: "www.linkedin.com/NikolaTesla",
            walletAddress: "0xA23456789012345678910"
        },
        description: "An electrical engineer and innovator. Passionate about sustainable energy solutions.",
        projects: [15],
        investments: [7, 13, 14]
    },
    15: {
        name: "Albert Einstein",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/AlbertEinstein",
            x: "www.x.com/AlbertEinstein",
            linkedin: "www.linkedin.com/AlbertEinstein",
            walletAddress: "0xB23456789012345678911"
        },
        description: "Theoretical physicist with a love for the mysteries of the universe.",
        projects: [16],
        investments: [2, 12]
    },
    16: {
        name: "Rosalind Franklin",
        image: "https://picsum.photos/200/301",
        links: {
            github: "www.github.com/RosalindFranklin",
            x: "www.x.com/RosalindFranklin",
            linkedin: "www.linkedin.com/RosalindFranklin",
            walletAddress: "0xC23456789012345678912"
        },
        description: "Biochemist and X-ray crystallographer. Exploring the structures of complex substances.",
        projects: [17],
        investments: [8, 10, 16]
    }    
}
export default users;