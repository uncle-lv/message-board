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
            content: Random.cword(50,120),
            avatar_url: Random.image("250x250"),
            nickname: Random.first(),
            like: Random.natural(0, 500),
            color: getRandomColor()
        }))
    }

    return blogs
} )