export const expeditionsData = [
  {
    id: "dakshin-gangotri",
    year: "1983",
    title: "First Base: Dakshin Gangotri",
    location: "Princess Astrid Coast, Antarctica",
    type: "Stations",
    region: "Antarctica",
    actionLabel: "Read the field report",
    coords: { x: 35, y: 30, map: "south" },
    story: "In 1983, India established its first scientific base in Antarctica, Dakshin Gangotri. Built on an ice shelf in record time during the third Indian expedition, it served as the primary hub for the Indian Antarctic Program and marked India's entry as a serious polar research nation.\n\nThe station was built using prefabricated timber and designed to withstand brutal blizzard conditions. However, being situated on a moving and accumulating ice shelf, it was progressively buried in snow. \n\nBy 1989, the accumulating ice forced the station to be decommissioned as a primary research base. It stands today as a buried monument to the early pioneers of Indian polar science.", // verify: exact date of final decommissioning vs conversion to transit camp.
    keyFacts: [
      "Established during the 3rd Indian Scientific Expedition to Antarctica.",
      "Constructed on the Princess Astrid Coast ice shelf.",
      "Operated as a fully functional base from 1983 to 1989.",
      "Abandoned after being buried by heavy snow accumulation."
    ],
    timeline: [
      { date: "1983", event: "Station commissioned" },
      { date: "1989", event: "Decommissioned due to ice burial" }
    ],
    relatedDatasets: "Ice shelf",
    relatedMedia: "Dakshin Gangotri"
  },
  {
    id: "maitri",
    year: "1989",
    title: "The Second Base: Maitri",
    location: "Schirmacher Oasis, Antarctica",
    type: "Stations",
    region: "Antarctica",
    actionLabel: "Explore Maitri's geology",
    coords: { x: 45, y: 40, map: "south" },
    story: "Learning from Dakshin Gangotri, India established its second station, Maitri, in 1989 on the ice-free rocky terrain of the Schirmacher Oasis. This strategic location provided a stable foundation, immune to the ice burial that claimed its predecessor.\n\nMaitri is equipped with modern laboratories for earth sciences, meteorology, glaciology, and upper atmosphere research. The station also built a freshwater lake named Lake Priyadarshini in front of the base to serve its water needs.\n\nMaitri has been continuously occupied since its inception, surviving extreme winter temperatures and serving as the gateway to the deep Antarctic interior for Indian convoys.", // verify: current maximum wintering population capacity.
    keyFacts: [
      "Located in the rocky Schirmacher Oasis to prevent ice burial.",
      "Draws fresh water from the nearby Lake Priyadarshini.",
      "Serves as the main logistical hub for inland convoys.",
      "Continuously occupied year-round since 1989."
    ],
    timeline: [
      { date: "1989", event: "Station commissioned" },
      { date: "2007", event: "Major communication upgrades" }
    ],
    relatedDatasets: "Geology Schirmacher",
    relatedMedia: "Maitri"
  },
  {
    id: "himadri",
    year: "2008",
    title: "Northern Watch: Himadri",
    location: "Ny-Ålesund, Svalbard, Arctic",
    type: "Stations",
    region: "Arctic",
    actionLabel: "View station blueprints",
    coords: { x: 50, y: 35, map: "north" },
    story: "Expanding its polar footprint, India opened its first Arctic research station, Himadri, in 2008. Situated in the international research village of Ny-Ålesund in Svalbard, Norway, it sits just 1,200 kilometers from the North Pole.\n\nHimadri operates primarily during the northern summer (roughly April to October). Its research focuses on the rapid atmospheric changes in the Arctic, space weather, and the intricate connections between Arctic climate and the Indian Monsoon system.\n\nThe station collaborates heavily with international neighbors, sharing data on glaciology and the biological adaptations of marine life to changing sea ice.", // verify: current exact operational months per year.
    keyFacts: [
      "India's first and only research station in the Arctic.",
      "Located in Ny-Ålesund, the northernmost permanent civilian settlement.",
      "Focuses on atmospheric research and Indian Monsoon linkages.",
      "Operates primarily during the Arctic summer."
    ],
    timeline: [
      { date: "2007", event: "First Indian Arctic expedition" },
      { date: "2008", event: "Himadri station inaugurated" }
    ],
    relatedDatasets: "Atmosphere Arctic",
    relatedMedia: "Himadri"
  },
  {
    id: "bharati",
    year: "2012",
    title: "Modern Marvel: Bharati",
    location: "Larsemann Hills, Antarctica",
    type: "Stations",
    region: "Antarctica",
    actionLabel: "See live field updates",
    coords: { x: 75, y: 65, map: "south" },
    story: "Bharati, India's third Antarctic research facility, was commissioned in 2012. Located in the Larsemann Hills, about 3,000 kilometers east of Maitri, it represents a massive leap in polar engineering and sustainable architecture.\n\nConstructed using specialized shipping containers wrapped in an aerodynamic shell, Bharati is designed to withstand 200 km/h winds and temperatures dropping to -40°C. It serves as a state-of-the-art facility for oceanography and the study of continental breakups.\n\nBharati is also a critical communication node, housing high-speed satellite links that allow real-time data transfer of high-resolution atmospheric imagery back to the mainland.", // verify: exact wind speed structural rating.
    keyFacts: [
      "Constructed from 134 specialized shipping containers.",
      "Focuses on oceanography and geological history (Gondwanaland).",
      "Features a highly efficient, combined heat and power system.",
      "Maintains direct high-speed satellite links to India."
    ],
    timeline: [
      { date: "2012", event: "Station commissioned" },
      { date: "2024", event: "Satellite data link upgrades" }
    ],
    relatedDatasets: "Oceanography Larsemann",
    relatedMedia: "Bharati"
  },
  {
    id: "latest-campaign",
    year: "2024",
    title: "43rd ISEA: Wintering Over",
    location: "Maitri & Bharati, Antarctica",
    type: "Campaigns",
    region: "Antarctica",
    actionLabel: "Follow this campaign",
    coords: { x: 60, y: 55, map: "south" },
    story: "The 43rd Indian Scientific Expedition to Antarctica (ISEA) represents the latest operational cohort managing both Maitri and Bharati stations during the grueling polar winter. \n\nThis campaign continues long-term data collection on atmospheric ozone, magnetic field fluctuations, and glaciological surveys of the coastal ice sheet. The team also manages complex logistical resupplies via specialized ice-class vessels.\n\nWintering teams face months of total darkness and isolation, acting as the vital caretakers of India's multi-million dollar polar infrastructure until the summer crew arrives.", // verify: exact number of wintering members for the 43rd ISEA.
    keyFacts: [
      "Currently managing both active Antarctic stations.",
      "Conducting ongoing ozone and magnetic field observations.",
      "Team comprises scientists, doctors, and logistics engineers.",
      "Facing the extreme isolation of the Antarctic winter night."
    ],
    timeline: [
      { date: "Nov 2023", event: "Expedition launched from India" },
      { date: "Mar 2024", event: "Wintering team isolated" },
      { date: "Nov 2024", event: "Expected relief arrival" }
    ],
    relatedDatasets: "ISEA logs",
    relatedMedia: "Expedition prep"
  }
];