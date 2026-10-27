(1) embeded document
----------------------
==> is a document assigned to a field of another document (nested document)

EX
---

    db.candidates.insertMany([
    {
        name: "Ahmed Ali",
        title: "Senior Frontend Engineer",
        address: { city: "Riyadh", country: "KSA" },
        skills: ["React", "TypeScript", "Next.js"],
        experience: [
            { company: "Salla", role: "Frontend Lead", from: 2021, to: 2024 },
            { company: "Careem", role: "Frontend Engineer", from: 2018, to: 2021 }
        ]
    },
    {
        name: "Sara Hassan",
        title: "Frontend Engineer",
        address: { city: "Dubai", country: "UAE" },
        skills: ["Vue", "JavaScript", "Tailwind"],
        experience: [
            { company: "Noon", role: "Frontend Engineer", from: 2022, to: 2025 },
            { company: "Talabat", role: "Junior Frontend Developer", from: 2020, to: 2022 }
        ]
    },
    {
        name: "Omar Khaled",
        title: "Staff Frontend Engineer",
        address: { city: "Cairo", country: "Egypt" },
        skills: ["React", "Redux", "GraphQL", "Jest"],
        experience: [
            { company: "Tabby", role: "Staff Engineer", from: 2023, to: 2025 },
            { company: "Foodics", role: "Senior Frontend Engineer", from: 2019, to: 2023 },
            { company: "Vezeeta", role: "Frontend Engineer", from: 2016, to: 2019 }
        ]
    },
    {
        name: "Layla Nasser",
        title: "UI Engineer",
        address: { city: "Doha", country: "Qatar" },
        skills: ["Angular", "RxJS", "TypeScript"],
        experience: [
            { company: "Elm", role: "UI Engineer", from: 2021, to: 2025 }
        ]
    },
    {
        name: "John Smith",
        title: "Frontend Architect",
        address: { city: "London", country: "UK" },
        skills: ["React", "Next.js", "Micro-frontends", "Node.js"],
        experience: [
            { company: "Property Finder", role: "Frontend Architect", from: 2020, to: 2025 },
            { company: "Careem", role: "Senior Frontend Engineer", from: 2016, to: 2020 }
        ]
    }
    ])

(2) when uses embeded documents we must consider that the outer document (parent document) size don't exceeds 16MB 

(3) query the embeded documents
----------------------
==> db.candidates.find({"experience.company" : "Careem"}) // find candidates that works/d on Careem company

(4) Access Nested documents
-----------------------------
==> db.candidates.findOne({name: "Omar Khaled"}).experience