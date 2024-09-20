<template>
  <Card>
    <template #title>Game Stats</template>
    <template #content>
      <DataTable :value="allData" tableStyle="max-width: 700px">
        <Column
          field="team1"
          :header="team1"
          headerStyle="text-align:center"
          bodyStyle="text-align:center"
        ></Column>
        <Column
          field="name"
          :header="score"
          headerStyle="text-align:center"
          bodyStyle="text-align:center"
        ></Column>
        <Column
          field="team2"
          :header="team2"
          headerStyle="text-align:center"
          bodyStyle="text-align:center"
        ></Column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router"; // Import useRoute to get the URL parameters

const allData = ref([]);
const team1 = ref("");
const team2 = ref("");
const score = ref("");
const route = useRoute(); // Get the current route object
const urlQuery = route.query.url; // Read the 'url' query parameter
// const proxURL = "https://thingproxy.freeboard.io/fetch/";
const proxURL = "https://api.allorigins.win/get?url=";
const apiUrl = `${proxURL}${encodeURIComponent(urlQuery)}`;
const fetchData = () => {
  console.log("Fetching data...");
  if (!urlQuery) {
    console.error("No URL query parameter found");
    return;
  }

  fetch(apiUrl, { cache: "no-store" })
    .then((response) => response.json())
    .then((data) => {
      // if data is String then parse it to JSON
      if (typeof data.contents === "string") {
        data = JSON.parse(data.contents);
      }
      const transformedData = generateData(data);
      allData.value = transformedData; // Update data without reloading the page
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

onMounted(() => {
  // Fetch the data when the component is mounted
  fetchData();

  const intervalId = setInterval(fetchData, 60000);
  onUnmounted(() => {
    clearInterval(intervalId);
  });
});

// Field mapping
const field_mapping = [
  ["Holds", "team1OConversions", "team2OConversions"],
  ["Clean Holds", "team1OPerfectConversions", "team2OPerfectConversions"],
  ["Turns", "team1Turns", "team2Turns"],
  ["Breaks", "team1DConversions", "team2DConversions"],
  //   break chances
  ["Break Chances", "team2OTurns", "team1OTurns"],
];

// Generate transformed data
const generateData = (data) => {
  team1.value = data[0].team1Name;
  team2.value = data[0].team2Name;
  score.value = `${data[0].team1Score}:${data[0].team2Score}`;

  return field_mapping.map(([name, team1Field, team2Field]) => ({
    team1: data[0][team1Field],
    name,
    team2: data[0][team2Field],
  }));
};
</script>

<style scoped>
/* set the font to roboto everywhere */

@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

body {
  font-family: "Roboto", sans-serif;
}

.p-component {
  font-family: "Roboto", sans-serif;
}
</style>
