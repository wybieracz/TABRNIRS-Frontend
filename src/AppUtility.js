import axios from "axios";

async function getSubjects(setRecruitmentData) {
    try {
        await axios.get("https://dev-tabrnirs-be-app.azurewebsites.net/subjects").then(
            response => {
                const temp = response.data.map(function(element) {
                    return {"active": false, "subject": element, "points": 0}
                });
                getRecruitmentData(temp, setRecruitmentData)
            }
        );
    } catch (error) {
        console.error(error);
    }
}

async function getRecruitmentData(recruitmentData, setRecruitmentData) {
    try {
        await axios.get("https://dev-tabrnirs-be-app.azurewebsites.net/result").then(
            response => {
                const temp = recruitmentData.map(function(element) {

                    for (let i = 0; i < response.data.length; i++) {
                        if(element.subject === response.data[i].subject)
                        return {"active": true, "subject": response.data[i].subject, "points": response.data[i].points};
                    }
                    return element;
                });
                setRecruitmentData(temp)
            }
        );
    } catch (error) {
        console.error(error);
    }
}

async function getUserId(setUserId) {

    try {
      await axios.get("https://dev-tabrnirs-be-app.azurewebsites.net/user/id").then(
          response => {
            setUserId(response.data)
          }
      );
    } catch (error) {
        console.error(error);
    }
}

async function getUser(setPersonalData) {
    try {
        await axios.get("https://dev-tabrnirs-be-app.azurewebsites.net/user").then(
            response => {
                setPersonalData({
                    userId: `${response.data.userId}`,
                    email: `${response.data.email}`,
                    name: `${response.data.name}`,
                    surname: `${response.data.surname}`,
                    pesel: `${response.data.pesel}`,
                    hometown: `${response.data.hometown}`,
                    streetAddress: `${response.data.streetAddress}`,
                    postalCode: `${response.data.postalCode}`
                })
            }
        );
    } catch (error) {
        console.error(error);
    }
}

async function getApps(setApps) {

    try {
        await axios.get("https://dev-tabrnirs-be-app.azurewebsites.net/user/apps").then(
            response => {
                setApps(response.data)
            }
        );
    } catch (error) {
        console.error(error);
    }
}

export { getSubjects, getUserId, getUser, getApps }