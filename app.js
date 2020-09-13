let i = 0;
let textAboutMe = `Hi Devs! I'm Wellisson Ribeiro. I'm ${new Date().getFullYear() - 1996} years old, from Curitiba-PR, but I've lived in Mafra-SC since my birth, married, and father of two children. Graduated in Analysis and Systems Development at UNOPAR. Developer with some years of experience developing applications with PHP
and Code Igniter v3/v4 Framework. I'm self-taught and I like to learn new technologies and i'm freelancer and also passionate about football, comic books, games, lots of music and films.`;

const typeWriteAbout = () => {
    
    if (i < textAboutMe.length) {
        let curChar = textAboutMe.charAt(i)
        
        document.querySelector("#textAboutMe").innerHTML += curChar
        i++;

        setTimeout(typeWriteAbout, 70)
    }
}

typeWriteAbout()

const requestWorks = () => {
				
    const divProjects = document.querySelector(".projects-content")

    const generateProjects = (data) => {
        
        let template = ``;

        divProjects.innerHTML = ``

        if (data.body.length) {

            data.body.forEach((element, index) => {
                template += 
                `<section class="nes-container is-dark project-card text-shadow">
                    <div class="profile">
                        <h4 class="name text-center">${element.client}</h4>
                        <p class="text-center">${element.class}</p>
                        <p class="text-center">${element.tags}</p>
                        <div class="icons projects text-center">
                            <a href="${element.link}" target="_blank" rel="noopener"
                                aria-label="coin"><i class="nes-icon coin"></i></a>

                            <a href="${element.link}" target="_blank"
                                rel="noopener" aria-label="trophy"><i class="nes-icon trophy"></i></a>
                        </div>
                    </div>
                </section>`
            })

            divProjects.innerHTML = template
        }
    }

    $.ajax({
        type: "GET",
        url: "https://www.wribeiiro.com/api/works",
        data: {},
        dataType: "JSON",
        processData: false,
        crossDomain: true,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic 69864bfe57e7a39e8ab90107a3bd0f75eb82bc009249dbb504f0af6058bd540650d3316476e5597fa4daa282250826c569e8bddd22a20d43ec5b3a605e6bedb8gstI9JsMCW3Yr04o0P2JKJyJKSCCk1RUQBn6Ic7DEuVynLVoaLfXxEkoZe5PCAwC"
        },
        beforeSend: () => {
            divProjects.innerHTML = `<section class="nes-container">Loading, please wait...</section>`
        },
        success: (response) => {
            generateProjects(response)
        },
        error: (err) => {
            divProjects.innerHTML = `<section class="nes-container">Sorry, this content could not be loaded, try again later :/ </section>`
        }
    })
}

document.addEventListener('scroll', () => {
    const scroll = document.documentElement.scrollTop || document.body.scrollTop
    const headerContent = document.querySelector("#header-content")
    const scrolBtn = document.querySelector("#scroll-btn")
    
    headerContent.classList.remove("sticky");
    scrolBtn.classList.remove("active");

    if (scroll > 100) {
        headerContent.classList.add("sticky")
        scrolBtn.classList.add("active")
    }
})

document.querySelector("#scroll-btn").addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

document.addEventListener("DOMContentLoaded", function(event) {
    requestWorks()
})