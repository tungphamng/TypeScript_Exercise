import Person from "./Person.ts";
import * as fs from 'fs';

class PersonRepository {
    
    private sourceFile: string;

    constructor(filePath: string) {
        this.sourceFile = filePath;
    }
    public async loadPersons(): Promise<Person[]> {
        try {
            const data = await fs.promises.readFile(this.sourceFile, 'utf-8');
            const jsonData = JSON.parse(data);
            return jsonData.map((item: any) => Person.fromJSON(item));
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
