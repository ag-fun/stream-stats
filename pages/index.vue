<template>
  <Card>
    <template #title>Game Stats</template>
    <template #content>
      <DataTable :value="allData" tableStyle="min-width: 100%">
        <Column field="team1" :header="team1">
          <template #body="slotProps">
            <div class="flex items-center">
              <span>{{ slotProps.data.team1 }}</span>
            </div>
          </template>
        </Column>
        <Column field="name" :header="score"></Column>
        <Column field="team2" :header="team2"></Column>
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
const proxURL = "https://thingproxy.freeboard.io/fetch/";
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
      console.log("Data fetched:", data);
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

  const intervalId = setInterval(fetchData, 30000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
});

// Field mapping
const field_mapping = [
  ["Turns", "team1Turns", "team2Turns"],
  ["Breaks", "team1DConversions", "team2DConversions"],
  ["Holds", "team1OConversions", "team2OConversions"],
  ["Clean Holds", "team1OPerfectConversions", "team2OPerfectConversions"],
  ["Turns", "team1Turns", "team2Turns"],
  ["Breaks", "team1DConversions", "team2DConversions"],
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

<style scoped></style>
