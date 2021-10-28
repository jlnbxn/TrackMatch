import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Shelf from "./components/Shelf";
import styled from "@emotion/styled/macro";
import Sidebar from "./components/Sidebar";
import Instructions from "./components/Instructions";
import Head from "./components/Head";
import Loading from "./components/Loading";
import Search from "./components/Search";
import Convert from "./components/Convert";
import Create from "./components/Create";
import { downloadCSV } from "./utils/downloadCsv";
import { createCsv } from "./utils/createCsv";
import { Album, Track } from "./types/ResultTypes";
import Footer from "./components/Footer";
import stringSimilarity from "string-similarity";
import Layout from "./components/Layout";
import ListInfo from "./components/ListInfo";
import SidebarItem from "./components/SidebarItem";
import TabList, { Tab } from "./components/TabList";

const List = styled.div`
  height: 100%;
  overflow-y: auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  @media (min-width: 767px) {
    overflow-y: scroll;
    margin-top: 0;
  }
`;


const Lock = styled.div`
  filter: "grayscale(1)";
  position: absolute;
  height: 100%;
  z-index: 9999;
  position: absolute;
  width: 100%;
  background: var(--sidebar-background-color);
  opacity: 0.7;
  display: ${(props) => (props.disabled ? "block" : "none")};
`;

const preview = new Audio();


const App = ({ vendor, secondaryVendor }) => {
  const [list, setList] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState();

  const [audio, setAudio] = useState({
    currentTrack: "",
    isPlaying: false,
    id: "",
  });
  const { api } = vendor;
  const { api: secondaryApi } = secondaryVendor;

  const prevVendorRef = useRef();
  const halt = useRef(false);

  useEffect(() => {
    setCount(0);
    setTotal();
  }, [vendor]);

  useEffect(() => {
    // If user is logged in to both services, get the playlist tracks of the opposing one
    if (!secondaryApi) return;
    secondaryApi.getUserPlaylists().then((res) => setPlaylists(res));
  }, [secondaryApi]);

  useEffect(() => {
    prevVendorRef.current = vendor; // Set a reference to the vendor that was changed from
    window.localStorage.setItem(prevVendor, JSON.stringify(list)); // Save the list to local storage
    const stickyValue = window.localStorage.getItem(vendor.name); // Set the list of the new vendor to the one saved in local storage, otherwise reset
    setList(stickyValue !== null ? JSON.parse(stickyValue) : []);
    preview.src = ""; // Stop any music
  }, [vendor]);

  const prevVendor = prevVendorRef.current;

  useEffect(() => {
    // Save the list to local storage when it changes
    window.localStorage.setItem(vendor.name, JSON.stringify(list));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const select = useCallback((id, index) => {
    setList((oldList) => {
      // If match is already selected, unselect on click
      let match =
        oldList[index].match.id === id
          ? {}
          : oldList[index].results.filter((result) => id === result.id)[0];
      const updatedList = [...oldList];
      updatedList[index] = { ...oldList[index], match };
      return [...updatedList];
    });
  }, []);

  const previewAudio = useCallback((event, src, id) => {
    // Prevent bubbling up
    event.stopPropagation();
    preview.src = src;
    // When finishes playing
    preview.onended = () => {
      setAudio((prevAudio) => {
        const updatedAudio = { ...prevAudio, isPlaying: false, id };
        return { ...updatedAudio };
      });
    };
    setAudio((prevAudio) => {
      const { currentTrack, isPlaying } = prevAudio;
      if (src === currentTrack && !isPlaying) {
        preview
          .play()
          .then(() => setAudio({ currentTrack: src, isPlaying: true, id }));
      } else if (currentTrack === src && isPlaying) {
        // If chosen preview is already playing, pause it
        preview.pause();
        setAudio({ currentTrack: src, isPlaying: false, id });
      } else {
        preview
          .play()
          .then(() => setAudio({ currentTrack: src, isPlaying: true, id }));
      }
      return { currentTrack: src, ...prevAudio };
    });
  }, []);

  const reload = useCallback(
    (event, type, index) => {
      event.preventDefault();
      preview.src = "";
      const data = new FormData(event.currentTarget);
      const term = data.get("term");
      const market = data.get("market");
      api.search(term, { market: market, type }).then((response) => {
        setList((oldList) => {
          let error = { message: "", type: "" };
          if (!response.length) {
            error.type = "No results found. ";
            error.message =
              "Please refine your search and click the 'Reload' button.";
          }
          const updatedList = [...oldList];
          updatedList[index] = {
            ...oldList[index],
            results:
              response.map((result) => new Track(vendor.name, result)) || [],
            error,
          };
          return [...updatedList];
        });
      });
    },
    [api]
  );

  const textboxSearch = async (event) => {
    event.preventDefault();
    halt.current = false;
    if (list.length !== 0) setList([]); // If there are already search results, reset them
    setOpen(false); // Close sidebar
    setLoading(true);
    setCount(0);
    preview.src = ""; // Stop any music
    const data = new FormData(event.currentTarget);

    const textbox = data.get("textbox").split("\n");
    const type = data.get("type") ? "albums" : "songs";
    setTotal(textbox.length);

    for (let line of textbox) {
      if (halt.current) break;
      let error = { message: "", type: "" };
      let response;

      // Only search non-empty lines, excluding invisible characters
      if (line !== "\r" && line.length) {
        response = await api.search(line, { type });
        if (type === "albums") {
          response = response.map((result) => new Album(vendor.name, result));
        } else {
          response = response.map((result) => new Track(vendor.name, result));
        }

        const ids = response.map((result) => result.id);
        const loved = await api.checkIfLibraryContains(ids, type);

        if (!response.length) {
          error.type = "No results found. ";
          error.message =
            "Please refine your search and click the 'Reload' button.";
        }

        setList((prevList) => [
          ...prevList,
          {
            id: uuidv4(),
            sourceId: null,
            term: line,
            type,
            market: api.country,
            match: {},
            loved: loved,
            results: response || [],
            error,
          },
        ]);
        setCount((prevCount) => prevCount + 1);
      }
    }
    setLoading(false);
  };

  const playlistSearch = async (event) => {
    event.preventDefault();
    halt.current = false;
    if (list.length !== 0) setList([]); // If there are already search results, reset them
    setOpen(false); // Close sidebar
    setLoading(true);
    setCount(0);
    preview.src = ""; // Stop any music
    const data = new FormData(event.currentTarget);
    console.log(data.values());
    const id = data.get("playlists");
    const type = "songs";
    const autoselect = data.get("autoselect");
    const playlistTracks = await secondaryApi.getPlaylistTracks(id);

    setTotal(playlistTracks.length);

    for (let track of playlistTracks) {
      if (halt.current) break;
      let error = { message: "", type: "" };
      let response;

      let match = {};
      let matches;
      const term = `${track.name} - ${track.albumName} - ${track.artistName}`;
      response = await api.getTracksByIsrc(track.isrc);
      let results =
        response.map((result) => new Track(vendor.name, result)) || [];

      // Reorder based on similarity if autoselect is activated
      if (autoselect && results.length) {
        matches = stringSimilarity.findBestMatch(
          term,
          results.map(
            (item) => `${item.title} - ${item.albumName} - ${item.artistName}`
          )
        );
        match = results[matches.bestMatchIndex];
        results = matches.ratings.map((item, index) => {
          return {
            ...results[index],
            similarity: item.rating,
          };
        });
        results.sort((a, b) => b.similarity - a.similarity);
      }

      if (!track.isrc) {
        error.type = "Uploaded track";
        error.message =
          "This track was uploaded and thus has no ISRC associated. To search by its metadata, click the reload button.";
      }

      if (track.isrc && !response.length) {
        error.type = "No results found";
        error.message =
          "No exact match found. This means the exact same recording, as per ISRC, is not available. To search by the songs metadata, click 'Reload'";
      }

      setList((prevList) => {
        // just prevent changing vendor during search!
        return [
          ...prevList,
          {
            type,
            sourceId: track.id,
            term: term,
            id: uuidv4(),
            market: api.market,
            match,
            loved: [],
            results,
            error,
          },
        ];
      });
      setCount((prevCount) => prevCount + 1);
    }
    setLoading(false);
  };

  const createPlaylist = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("playlist_name");
    const description = data.get("playlist_description");
    const missingTracksBox = data.get("missing_tracks");
    let tracks = [];
    let missingTracks = [];

    for (let searchObj of list) {
      const { match, market, sourceId } = searchObj;
      // Check if object is not empty
      if (Object.keys(match).length) {
        if (match.type === "albums") {
          let albumTracks = await api.getAlbumById(match.id, market);
          tracks.push(...albumTracks);
        } else {
          tracks.push({ id: match.id, type: match.type });
        }
      } else {
        missingTracks.push({ id: sourceId, type: "songs" });
      }
    }
    await api.createPlaylist(name, description, tracks);
    if (missingTracksBox) {
      await secondaryApi.createPlaylist(
        "missingtracks",
        description,
        missingTracks
      );
    }
  };

  return (
    <Layout vendor={vendor.name}>
      <Head themeColor={vendor.themeColor} name={vendor.formattedName} />
      <Sidebar
        vendor={vendor.name}
        open={open}
        setOpen={setOpen}
        footer={
          <Footer
            vendor={vendor}
            secondaryVendor={secondaryVendor}
            loading={loading}
          />
        }
      >
        <div style={{ height: "100%", position: "relative" }}>
          <Lock
            onClick={(e) => {
              if (!vendor.api) e.preventDefault();
            }}
            disabled={!vendor.api}
          />
          <SidebarItem>
            <TabList>
              <Tab label={"Textbox"}>
                <Search onSubmit={textboxSearch} disabled={!vendor.api} />
              </Tab>
              {api && secondaryApi && (
                <Tab label={"Convert"}>
                  <Convert
                    onSubmit={playlistSearch}
                    playlists={playlists}
                    loading={loading}
                    count={count}
                    total={total}
                    halt={() => (halt.current = true)}
                  />
                </Tab>
              )}
            </TabList>
          </SidebarItem>
          <SidebarItem header="Create Playlist">
            <Create onSubmit={createPlaylist} />
          </SidebarItem>
          {list.length > 0 && (
            <ListInfo
              reset={() => setList([])}
              download={() => downloadCSV(createCsv(list))}
              total={total}
              count={total}
              list={list}
            />
          )}
        </div>
      </Sidebar>
      <List>
        {list.length ? (
          list.map((searchObj, index) => (
            <Shelf
              key={searchObj.id}
              index={index}
              term={searchObj.term}
              match={searchObj.match}
              results={searchObj.results}
              market={searchObj.market}
              loved={searchObj.loved}
              type={searchObj.type}
              error={searchObj.error}
              audio={audio}
              select={select}
              reload={reload}
              previewAudio={previewAudio}
            />
          ))
        ) : loading ? (
          <Loading vendor={vendor.name} />
        ) : (
          <Instructions />
        )}
      </List>
    </Layout>
  );
};

export default App;
