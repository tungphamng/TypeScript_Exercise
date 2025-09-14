import Person from "./person.js";
import * as fs from 'fs';

interface PersonData{
    name: string;
    age: number;
    city: string;
}

class PersonRepository {
    
    private sourceFile: string;

    constructor(filePath: string) {
        this.sourceFile = filePath;
    }
    public async loadPersons(): Promise<Person[]> {
        try {
            if(this.sourceFile.trim().length === 0) {
                throw new Error("Source file path cannot be empty");
            }
            const data = await fs.promises.readFile(this.sourceFile, 'utf-8');
            const jsonData = JSON.parse(data);
            return jsonData.map((item: PersonData[]) => Person.fromJSON(item));
         } 
        catch (error) {
            console.error("Error loading persons:", error);
            return [];
        }
    }

    public async savePersons( persons: Person[], targetFile: string): Promise<void> {
        try {
            const jsonData = JSON.stringify(persons.map(person => person.toJSON()), null, 2);
            await fs.promises.writeFile(targetFile, jsonData, 'utf-8');
        } catch (error) {
            console.error("Error saving persons:", error);
        }   
    
    }
}

export default PersonRepository;
