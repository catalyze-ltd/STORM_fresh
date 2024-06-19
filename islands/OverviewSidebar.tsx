import { useState } from "preact/hooks";
import axios from "https://esm.sh/axios@1.7.2";
import React from "https://esm.sh/react@18.3.1";

function OverviewSidebar() {

    //////////////////////////////////////////////////////////////////////////
    //                         Adding the hooks                             //
    //////////////////////////////////////////////////////////////////////////
    
        const [scenario, setScenario] = useState<string[]>([]);
        const [scenarioSelected, setScenarioSelected] = useState<string>("");
        const [platform, setPlatform] = useState<string[]>([]);
        const [platformSelected, setPlatformSelected] = useState<string>("");
        const [orbatTable, setOrbatTable] = useState<string[]>([]);
        const [platformTable, setPlatformTable] = useState<string[]>([]);
    
    //////////////////////////////////////////////////////////////////////////
    //           Importing scenarios from JSON to dropdown list             //
    //////////////////////////////////////////////////////////////////////////

    async function generatePlatformList() {
        await axios.get("file:///C:/Users/WillSharrock/OneDrive%20-%20Catalyze%20Consulting/Desktop/STORM_fresh-main/data/JSON_Data/Scenarios list.json")
        .then((response) => {
console.log(response.data);
        })
            .catch((error) => console.log(error));
    }

        // function handleClickScenario(event) {
        //     setScenarioSelected(event.target.innerHTML);
        // }
    
        // useEffect(() => {
        //     document.getElementById("scenario-list-placeholder").value = scenarioSelected;
        //     }, [scenarioSelected]);

        // async function generateScenarioName() {
        //     await axios.get("./data/JSON_Data/Scenarios list.json")
        //     .then((response) => {
        //         const data = response.data;
        //         console.log(data);
        //         const scenarioList=[];
        //         for(let i=0; i<response.data.length; i++) {
        //             scenarioList.push(data[i]["Scenario"]);
        //         }
        //         setScenario(scenarioList);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
        // }
    
        // function handleClickScenario(event: React.ChangeEvent<HTMLInputElement>) {
        //     setScenarioSelected(event.target.innerHTML);
        // }
    
        // useEffect(() => {
        //     (document.getElementById("scenario-list-placeholder") as HTMLInputElement).value = scenarioSelected;
        //     }, [scenarioSelected]);
    
    //////////////////////////////////////////////////////////////////////////
    //                    Generating the 'Platform table'                   //
    //////////////////////////////////////////////////////////////////////////
    
        // async function populatePlatformTable() {
        //     await axios.get("./data/JSON_Data/Platform list.json")
        //     .then((response) => {
        //         let dataTable: string[] = [];
        //         const data = response.data;
        //         const headers: string[] = Object.keys(data[0]);
        //         for (let i=0; i<response.data.length; i++) {
        //             if (data[i]["Platform"] === platformSelected) {
        //                 const tableContent: string[] = Object.values(data[i]);
        //                 for (let i=1; i<tableContent.length; i++) {
        //                     dataTable.push([headers[i], tableContent[i]]);
        //                 }
        //             }
        //         }
        //         setPlatformTable([...dataTable]);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        // }
    
    //////////////////////////////////////////////////////////////////////////
    //         Importing platform details from JSON to dropdown list        //
    //////////////////////////////////////////////////////////////////////////
    
        // async function generatePlatformList() {
        //     await axios.get("./data/JSON_Data/Scenario entities.json")
        //     .then((response) => {
        //         const data = response.data;
        //         let platformList=[];
        //         for(let i=0; i<response.data.length; i++) {
        //             platformList.push(data[i]["Platform"]);
        //         }
        //         setPlatform(platformList.filter((v,i,self) => i==self.indexOf(v)));
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
        // }
    
        // function handleClickPlatform(event: React.ChangeEvent<HTMLInputElement>) {
        //     setPlatformSelected(event.target.innerHTML);
        // }
    
        // useEffect(() => {
        //     (document.getElementById("platform-list-placeholder") as HTMLInputElement).value = platformSelected;
        //     populatePlatformTable();
        //     }, [platformSelected]);
    
        // useEffect(() => {
        // }, [platformTable]);
    
    //////////////////////////////////////////////////////////////////////////
    //                   Generating the 'ORBAT' table                       //
    //////////////////////////////////////////////////////////////////////////
    
        // async function populateOrbatTable() {
        //     await axios.get("./data/JSON_Data/Scenario entities.json")
        //     .then((response) => {
        //         let dataTable: string[] = [];
        //         const data = response.data;
        //         for (let i=0; i<response.data.length; i++) {
        //             if (data[i]["Scenario"] === scenarioSelected) {
        //                 const tablePlatform = data[i]["Platform"];
        //                 const tableColour = data[i]["Colour"];
        //                 dataTable.push([tablePlatform, tableColour]);
        //             }
        //         }
        //         setOrbatTable([...dataTable]);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        // }
    
    //////////////////////////////////////////////////////////////////////////
    //                 Initialising the overview interface                  //
    //////////////////////////////////////////////////////////////////////////
    
        return(
            <div>
                <h3>Setup</h3>
                <hr />
                <h4>Scenario list</h4>
                <div className="dropdown d-grid border rounded-2">
                    <button onClick={generatePlatformList} className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <input type="text" id="scenario-list-placeholder" value="" placeholder="Select..." className="col-11 border-0"/>
                    </button>
                    <div className="dropdown-menu col-12" id="scenario" aria-labelledby="dropdownMenuButton">
                        {scenario.map((item, index) => {
                            return(
                                <button className="dropdown-item" onClick={() => console.log("handleClickScenario")} key={index} >{item}</button>
                            )
                        })}
                    </div>
                </div>
                <button onClick={() => console.log("populateOrbatTable")}>
                    Load scenario
                </button>
                <hr />
                <h4>ORBAT</h4>
                <table className="table table-bordered">
                <thead>
                    <tr className="table-secondary">
                        <th scope="col">Platform</th>
                        <th scope="col">Colour</th>
                    </tr>
                </thead>
                <tbody id="orbat-table-body">
                    {orbatTable.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{value[0]}</td>
                                <td>{value[1]}</td>
                            </tr>
                        )
                    })}
                </tbody>
                </table>
                <hr />
                <h4>Platform details</h4>
                <div className="dropdown d-grid border rounded-2">
                <button onClick={() => console.log("generatePlatformList")} className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <input type="text" id="platform-list-placeholder" placeholder="Select..." className="col-11 border-0"/>
                    </button>
                    <div className="dropdown-menu col-12" aria-labelledby="dropdownMenuButton">
                        {platform.map((item, index) => {
                                return(
                                    <button className="dropdown-item" onClick={() => console.log("handleClickPlatform")} key={index} >{item}</button>
                                )
                            })}
                    </div>
                </div>
                <table className="table table-bordered">
                <tbody id="orbat-table-body">
                    {platformTable.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{value[0]}</td>
                                <td>{value[1]}</td>
                            </tr>
                        )
                    })}
                </tbody>
                </table>
            </div>
        );
    }
    
    export default OverviewSidebar;