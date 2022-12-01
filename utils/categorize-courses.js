export  function categorize(courses) {
        let res = []

        for (let course of courses) {
            let found = res.find(item => item.category === course.category)
            if (!found) {
                res.push({
                    category: course.category,
                    courses: [
                        {
                            id: course.id,
                            name: course.name
                        }
                    ]
                })
            } else {
                found.courses.push({
                    id: course.id,
                    name: course.name
                })
            }
        }
        return res
}
 