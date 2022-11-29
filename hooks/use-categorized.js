import { useEffect, useState } from 'react'

export default function useCategorized() {
    const [ categorized, setCategorized] = useState([])
    const [fetched, setFetched]  = useState(false)
    useEffect(() => {
        async function fetchCourses() {
            const res = await fetch('/api/courses');
            const courses = await res.json();
            setCategorized(categorize(courses))
            setFetched(true)
        }
        if (fetched === false) {
            fetchCourses()
        }
       
    }, [])

    return [fetched, categorized] 

    function categorize(courses) {
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
}