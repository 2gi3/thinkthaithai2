
describe("Login page", () => {
  before(() => {
    cy.visit("/")


  })
  it("Login with Google", () => {

    const currentDateTime = new Date();
    const futureDateTime = new Date(currentDateTime.getTime() + 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    const newExpires = futureDateTime.toISOString();

    cy.intercept('GET', '/api/auth/session', {
      user: {
        name: "giuseppe I",
        email: "gippolito@hotmail.co.uk",
        image: "https://lh3.googleusercontent.com/a/AGNmyxaPifnVXMi0RiRzfupzV_i_2sQ9otYr7gH3a7qHbg=s96-c"
      },
      expires: newExpires
    }).as('getSessionRequest');

    cy.intercept('GET', 'http://localhost:3000/api/students?searchBy=email&value=gippolito@hotmail.co.uk', {
      "_id": "6455b0296512beb55857ba6c",
      "name": "giuseppe I",
      "email": "gippolito@hotmail.co.uk",
      "image": "https://lh3.googleusercontent.com/a/AGNmyxaPifnVXMi0RiRzfupzV_i_2sQ9otYr7gH3a7qHbg=s96-c",
      "emailVerified": "2023-06-21T22:38:43.915Z",
      "paidLessons": 199,
      "startedCourses": {
        "646db8b4ae7853838a4e981c": [
          "More about this course",
          "Obsolete consonants",
          "Consonants Structure",
          "Your first consonant ก",
          "ข ไข่ -   kŏr kài",
          "ค ควาย - kor kwaai",
          "น  หนู - nor  nŭu",
          "ฆ ระฆัง - kor rá-kang",
          "ง  งู - ngor nguu",
          "จ จาน - jor  jaan",
          "ฉ ฉิ่ง - chŏr chìng",
          "ช ช้าง - chor cháang",
          "ซ โซ่ - sor sôh",
          "ฌ เฌอ - chor cher",
          "ญ หญิง - yor yĭng",
          "ฎ ชฎา - dor chá-daa",
          "ฏ ปฏัก - dtor bpà-dtàk",
          "ฐ ฐาน - tŏr tăan",
          "ฑ มณโฑ - tor mon-toh",
          "ฒ ผู้เฒ่า - tor pûu-tâo",
          "ณ เณร - nor nayn",
          "ด เด็ก - dor dèk",
          "ต เต่า - dtor dtào",
          "ถ ถุง - tŏr tŭeng",
          "ท ทหาร - tor   tá-hăan",
          "ธ ธง - tor  tong",
          "บ ใบไม้ - bor  bai-mái",
          "ป  ปลา - bpor  bplaa",
          "ผ ผึ้ง - pŏr  pûeng",
          "ฝ ฝา - fŏr  făa",
          "พ พาน - por  paan",
          "ฟ ฟัน - for  fan",
          "ภ สำเภา - por  săm-pao"
        ]
      }
    }).as('getSessionRequest');


    cy.loginByGoogleApi()

      .then(() => {

        cy.visit("/account")

      })
  })
})


