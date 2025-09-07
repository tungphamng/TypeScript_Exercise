class Person {
    readonly name: string;
    public age!: number;
    public city!: string;
    

    constructor(name: string, age: number, city: string) {
        if(name.length === 0) {
            throw new Error("Name cannot be empty");
        }

        if(age <=0) {
            throw new Error("Age must be positive");
        }
        this.name = name;
        this.age = age;
        this.city = city;
    }

    public greet(): string {
        return "Hi, I'm " + this.name + " from " + this.city + ".";
    }

    public celebrateBirthday(): void {
        this.age +=1;
    
    }

    public updateCity(newCity: string): void{
        this.city = newCity;
    }

    public isAdult(): boolean {
        return this.age >= 18;
    }

    public hasSameCity(other: Person): boolean{
        return this.city===other.city;
    }

    public toJSON(): object {
        return{
            name: this.name,
            age: this.age,
            city: this.city
        }
    }

    public static fromJSON(json: any): Person {
        const personTemp = new Person(json.name, json.age, json.city);
        return personTemp;

    }

}



export default Person;

