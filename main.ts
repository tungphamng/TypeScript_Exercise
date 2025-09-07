import PersonRepository from "./PersonRepository.ts";

let test: PersonRepository = new PersonRepository('data/people.json');

async function main() {
    const persons = await test.loadPersons();

    for(let person of persons) {
        person.celebrateBirthday();
        console.log(person.greet());
        console.log("Is adult:", person.isAdult());
    }

    
    await test.savePersons(persons,"data/people.out.json");
    console.log(persons);
}
main();