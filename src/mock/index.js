import Mock from 'mockjs'

Mock.setup({ timeout: '100-300'})

const Random = Mock.Random

const colors = ['#EF5564', '#9CF0E3', '#F488A8']

function getRandomColor() {
    return colors[Random.natural(0, 2)]
}

Mock.mock("/api/messages", "get", () => {
    let blogs = []

    for (let i = 0; i <= Random.natural(30, 60); i++) {
        blogs.push(Mock.mock({
            id: "@increment",
            message: Random.cword(50,120),
            faceimg: Random.image("250x250"),
            nickname: Random.first(),
            like_count: Random.natural(0, 500),
            color: getRandomColor()
        }))
    }

    return blogs
} )

Mock.mock("/api/total", "get", () => {
    return Random.natural(500, 1200)
} )