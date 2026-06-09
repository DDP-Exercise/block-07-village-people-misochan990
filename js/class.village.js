"use strict";

import NobleCitizen from "./class.nobleCitizen.js";
import Citizen from "./class.citizen.js";

/**
 * Create a Village class. Each village should have
 * - a name
 * - an array of its buildings
 * - an array of its citizens
 *
 * You can see in main.js what methods a village should provide.
 * implement them.
 */

import Building from "./class.building.js";
import NobleBuilding from "./class.nobleBuilding.js";


export default class Village {
    constructor(name) {
        this.name = name;
        this.buildings = [];
        this.citizens = [];
    }

    addBuilding(name, capacity, noble = false) {
        this.buildings.push(noble ? new NobleBuilding(name, capacity) : new Building(name, capacity, noble));
    }

    addCitizen(name, noble = false) {
        let citizen = (noble ? new NobleCitizen(name) : new Citizen(name));
        this.citizens.push(citizen);
        this.shelterCitizen(citizen);
    }

    shelterCitizen(citizen) {
        for(const buildings of this.buildings) {
           if(buildings.addResident(citizen))
               return true;
        }
        return false;
    }

    shelterTheWorthy() {
        let sortedCitizens = [...this.citizens].sort((a, b) => a.rank - b.rank);
        for (const citizen of sortedCitizens) {
            if (citizen.home === null) {
                this.shelterCitizen(citizen);
            }
        }
    }

    printCitizenDirectory() {
        //For all buildings: list your residents
        for (const building of this.buildings) {
            building.listAllResidents();
        }
        this.listAllHomeless();
    }

    listAllHomeless() {
        console.log("%c Homeless People of " + this.name + ":", "background-color: #a88. color: white");
        for (const citizen of this.citizens) {
            if (citizen.home == null)
                console.log(String(citizen));
        }
    }
}


//: die ganzen Imports managen
//: debuggen/ testen
//: nobleBuiding