SetupModal();

LoadTopSites();

BuildFeedPage();

SetSearchFormTarget();

CleanUpUrls();

showTime();



async function SetSearchFormTarget() {
  const settings = await GetSettings();
  const engine = settings["search"].value;
  let url = "";
  switch (engine) {
    case "Google":
      url = "https://www.google.com/search";
      break;
    case "Bing":
      url = "https://www.bing.com/search";
      break;
    case "Yahoo":
      url = "https://uk.search.yahoo.com/search";
      break;
    case "Duck Duck Go":
      url = "https://duckduckgo.com/";
      break;
    case "Ecosia":
      url = "https://www.ecosia.org/search";
      break;
    case "Brave":
      url = "https://search.brave.com/search";
      break;
    default:
      url = "https://www.google.com/search";
  }
  document.getElementById("searchform").action = url;
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName == "local") {
    if (changes.FeedHtml) {
      if (!changes.FeedHtml.newValue) {
        document.getElementById("news").innerHTML = "";
      } else {
        document.getElementById("news").innerHTML = changes.FeedHtml.newValue;
      }
    }
  }
});

async function LoadTopSites() {
  chrome.topSites.get((sites) => {

    let innerSites = "";
    let innerSite = "";

    let urlGoogle = "https://www.google.com";
    let urlYoutube = "https://www.youtube.com/";
    let urlGmail = "https://accounts.google.com/ServiceLogin/identifier?elo=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin";
    let urlY = "https://www.bbc.com/amharic";
    let urlB = "https://login.yahoo.com/?.src=ym&pspid=159600001&activity=mail-direct&.lang=en-US&.intl=us&.done=https%3A%2F%2Fmail.yahoo.com%2Fd";

    let urlVOA = "https://amharic.voanews.com/";
    let urlReporter = "https://www.ethiopianreporter.com/";
    let urlZhabesha = "https://zehabesha.com/";
    let urlEzigar = "https://www.ezega.com/News/News/1/Ethiopia";


    // sites = sites.slice(0, 8);
    // sites.forEach((site) => {
    // let title = site.title;
    // if (title.length > 14) {
    //   title = title.slice(0, 14) + "...";
    // }

    innerSites += `
    <style>

      .ico {
        
        display: flex; 
        flex-direction: row; 
        justify-content: center; 
        width: 50%;
        margin:0px 150px 0px 220px;
       
      }

      .im{
        width: 50px;
        height: 50px;
      }
    
    </style>

    <div class="ico">

      <div class="column">
        <a href="${urlY}">
          <div class="box">
              <div>
                  <img alt="img class="im" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png">
              </div>
          </div>
        </a>
      </div>

      <div class="column">
      <a href="${urlYoutube}">
        <div class="box">
            <div>
                <img alt="img class="im" src="https://img.icons8.com/color/344/youtube-play.png">
            </div>
        </div>
      </a>
    </div>
        
    <div class="column">
    <a href="${urlGmail}">
      <div class="box">
          <div>
              <img alt="img class="im" src="https://img.icons8.com/color/344/gmail-new.png">
          </div>
      </div>
    </a>
  </div>

  <div class="column">
  <a href="${urlB}">
    <div class="box">
        <div>
            <img alt="img class="im" src="https://img.icons8.com/color/344/yahoo.png">
        </div>
    </div>
  </a>
</div>

<div class="column">
<a href="${urlGoogle}">
  <div class="box">
      <div>
          <img alt="img class="im" src="https://img.icons8.com/color/344/google-logo.png">
      </div>
  </div>
</a>
</div>

    </div>
    `;
    // =========================================================================================
    innerSite += `
    
    <div class="column">
    <a href="${urlVOA}">
        <img alt="img" style="width: 50px;height: 50px;" src="https://amharic.voanews.com/Content/responsive/VOA/am-ET/img/logo.png">
    </a>
    </div>

    <div class="column">
    <a href="${urlReporter}">
        <img alt="img" style="width: 50px;height: 50px;" src="https://www.ethiopianreporter.com/sites/default/files/reporter_logo_color_amh_web.png">
    </a>
    </div>

    <div class="column">
    <a href="${urlZhabesha}">
        <img alt="img" style="width: 50px;height: 50px;" src="https://zehabesha.com/wp-content/uploads/2022/01/8.png">
    </a>
    </div>

    <div class="column">
    <a href="${urlEzigar}">
        <img alt="img" style="width: 50px;height: 50px;" src="https://www.ezega.com/content/images/logo.png">
    </a>
    </div>

    <div class="column">
    <a href="${urlVOA}">
        <img alt="img" style="width: 50px;height: 50px;" src="https://amharic.voanews.com/Content/responsive/VOA/am-ET/img/logo.png">
    </a>
    </div>

    `;

    // });

    document.getElementById("commonSites").innerHTML = innerSites;
    // document.getElementById("commonSite").innerHTML = innerSite;
  });
}

async function SetupModal() {
  var modal = document.querySelector(".modal"); // assuming you have only 1
  var html = document.querySelector("html");

  document.querySelector("#open-settings").addEventListener("click", function (event) {
    event.preventDefault();
    modal.classList.add("is-active");
    html.classList.add("is-clipped");

    OpenGeneralSettings();
    OpenRssSettings();
  });

  document.getElementById("save-settings").addEventListener("click", function (e) {
    SaveSettings();
  });

  modal.querySelector(".modal-background").addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.remove("is-active");
    html.classList.remove("is-clipped");
  });

  const closeElements = modal.getElementsByClassName("close-modal");

  for (const el of closeElements) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.remove("is-active");
      html.classList.remove("is-clipped");
    });
  }

  document.getElementById("clear-cache").addEventListener("click", function (e) {
    clearLocalStorage();
  });

  document.getElementById("reset-rss-feeds").addEventListener("click", function (e) {
    ResetRssFeeds();
  });

  document.getElementById("reset-settings").addEventListener("click", function (e) {
    ResetSettings();
  });
}

async function BuildFeedPage() {
  chrome.storage.local.get("FeedHtml", function (items) {
    if (items.FeedHtml) {
      document.getElementById("news").innerHTML = items.FeedHtml;
    }
  });
}

function closeSettings() {
  var modal = document.querySelector(".modal"); // assuming you have only 1
  var html = document.querySelector("html");

  modal.classList.remove("is-active");
  html.classList.remove("is-clipped");
}

async function clearLocalStorage() {
  return new Promise((resolve, reject) => {
    SetModalLoading(true);
    chrome.storage.local.clear(function () {
      var error = chrome.runtime.lastError;
      if (error) reject(error);
      else {
        chrome.runtime.sendMessage({ contentScriptQuery: "ForceRefresh" }, (data) => {
          SetModalLoading(false);
          resolve();
        });
      }
    });
  });
}

async function clearSyncStorage() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.clear(function () {
      var error = chrome.runtime.lastError;
      if (error) reject(error);
      else resolve();
    });
  });
}

async function ResetSettings() {
  return new Promise((resolve, reject) => {
    SetModalLoading(true);
    chrome.storage.sync.remove("settings", async function () {
      var error = chrome.runtime.lastError;
      if (error) reject(error);
      else {
        // This adds the defaults back
        await GetSettings();
        await OpenGeneralSettings();
        SetModalLoading(false);
        resolve();
      }
    });
  });
}

async function ResetRssFeeds() {
  return new Promise((resolve, reject) => {
    SetModalLoading(true);
    chrome.storage.sync.remove("feeds", async function () {
      var error = chrome.runtime.lastError;
      if (error) reject(error);
      else {
        // This adds the defaults back
        await GetFeeds();
        await OpenRssSettings();
        SetModalLoading(false);
        resolve();
      }
    });
  });
}

async function CleanUpUrls() {
  chrome.runtime.sendMessage({ contentScriptQuery: "cacheClean" });
}

async function OpenGeneralSettings() {
  document.getElementById("settings-general").innerHTML = "";

  const settings = await GetSettings();

  let generalHtml = "<table style='width:100%'><thead><tr><td>Setting</td><td>Value</td></tr></thead><tbody id='settings-general-table'>";

  for (const [key, setting] of Object.entries(settings)) {
    let valueHtml = "";
    switch (setting.valueType) {
      case "boolean":
        let checked = "";
        if (setting.value == "1") checked = "checked";
        valueHtml = `<input data-key="${setting.key}" type="checkbox" ${checked}>`;
        break;
      case "dropdown":
        let values = "";
        for (const type of setting.valueTypes) {
          if (setting.value == type) {
            values = values + `<option selected>${type}</option>\n`;
          } else {
            values = values + `<option>${type}</option>\n`;
          }
        }
        valueHtml = `
        <div class="select is-small">
          <select data-key="${setting.key}">
            ${values}
          </select>
        </div>`;
        break;
      default:
        valueHtml = `<input data-key="${setting.key}" class="input is-small" type="text" value="${setting.value}">`;
    }
    generalHtml += `<tr><td>${setting.friendlyName}</td><td>${valueHtml}</td></tr>`;
  }

  generalHtml += "</tbody></table>";

  document.getElementById("settings-general").innerHTML = generalHtml;
}

async function OpenRssSettings() {
  document.getElementById("settings-feeds").innerHTML = "";

  const feeds = await GetFeeds();

  let feedHtml =
    "<table style='width:100%'><thead><tr><td>RSS Name</td><td class='centre-column'>Enabled</td><td class='centre-column'>Delete</td></tr></thead>";

  for (const feed of feeds) {
    const checked = feed.enabled ? "checked" : "";
    feedHtml += `<tr><td>${feed.title} ${feed.failed ? "- (Failed To Get Feed)" : ""
      }</td><td class='centre-column'><input class="rss-enable-checkbox" type="checkbox" data-url="${feed.rssLink
      }" ${checked}></td><td class='centre-column'><button data-url="${feed.rssLink
      }" class="button is-small RssDeleteBtn"><i class="fas fa-times"></i></button></td></tr>`;
  }

  feedHtml +=
    '<tr><td><input class="input is-expanded is-small" type="text" id="newRssValue" placeholder="Type an RSS URL"></td><td class="centre-column"><button id="newRssButton" class="button is-success is-small"><i class="fas fa-plus"></i></button></td></tr></table>';

  document.getElementById("settings-feeds").innerHTML = feedHtml;

  document.getElementById("newRssButton").addEventListener("click", function () {
    const url = document.getElementById("newRssValue").value;
    if (url == "") {
      console.log("No URL");
      return;
    }

    AddNewRSS(url);
  });

  const deleteButtons = document.getElementsByClassName("RssDeleteBtn");
  for (const deleteButton of deleteButtons) {
    const url = deleteButton.dataset.url;
    deleteButton.addEventListener("click", function () {
      RemoveRss(url);
    });
  }
}

async function AddNewRSS(url) {
  SetModalLoading(true);
  const rssFeed = await GenerateFeedInfo(url);

  const feeds = await GetFeeds();

  feeds.push(rssFeed);

  chrome.storage.sync.set({ feeds: feeds }, function () {
    chrome.runtime.sendMessage({ contentScriptQuery: "ForceRefresh" }, (data) => { });
    OpenRssSettings();
    SetModalLoading(false);
  });
}

async function GenerateFeedInfo(url) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ contentScriptQuery: "GenerateFeedInfo", url: url }, (data) => {
      resolve(data);
    });
  });
}

async function RemoveRss(url) {
  SetModalLoading(true);
  const feeds = await GetFeeds();
  let index = 0;
  let found = false;
  for (const feed of feeds) {
    if (feed.rssLink == url) {
      found = true;
      break;
    }
    index++;
  }

  if (found) {
    feeds.splice(index, 1);
  }

  chrome.storage.sync.set({ feeds: feeds }, function () {
    chrome.runtime.sendMessage({ contentScriptQuery: "ForceRefresh" }, (data) => { });
    OpenRssSettings();
    SetModalLoading(false);
  });
}

async function GetSettings() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ contentScriptQuery: "GetSettings" }, async (data) => {
      resolve(data);
    });
  });
}

async function GetFeeds() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ contentScriptQuery: "GetFeeds" }, async (data) => {
      resolve(data);
    });
  });
}

async function SaveSettings() {
  SetModalLoading(true);
  const settingContainerChildren = document.getElementById("settings-general-table").childNodes;

  const settings = await GetSettings();

  for (const node of settingContainerChildren) {
    let input = node.querySelector("input");
    if (!input) input = node.querySelector("select");
    const key = input.dataset.key;

    let inputVal = input.value;
    if (input.type == "checkbox") inputVal = input.checked;

    const settingVal = settings[key];
    settingVal.value = inputVal;
    settings[key] = settingVal;
  }

  const newSettings = [];

  for (const [key, setting] of Object.entries(settings)) {
    newSettings.push(setting);
  }

  const rssCheckboxes = document.getElementsByClassName("rss-enable-checkbox");
  const feeds = await GetFeeds();
  for (const checkbox of rssCheckboxes) {
    const url = checkbox.dataset.url;
    const value = checkbox.checked;

    let index = 0;
    let found = false;
    for (const feed of feeds) {
      if (feed.rssLink == url) {
        found = true;
        break;
      }
      index++;
    }

    if (found) {
      feeds[index].enabled = value;
    }
  }

  chrome.storage.sync.set({ settings: newSettings, feeds: feeds }, function () {
    chrome.runtime.sendMessage({ contentScriptQuery: "SettingsSaved" }, (data) => {
      SetModalLoading(false);
      SetSearchFormTarget();
      closeSettings();
    });
  });
}

async function SetModalLoading(loading) {
  if (loading) {
    $(".loader-wrapper").addClass("is-active");
  } else {
    $(".loader-wrapper").removeClass("is-active");
  }
}

// Clock

function showTime(){
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;
  
  setTimeout(showTime, 1000);
  
}


// function currentTime() {
//   let date = new Date(); 
//   let hh = date.getHours();
//   let mm = date.getMinutes();
//   let ss = date.getSeconds();
//   let session = "AM";

//   if(hh == 0){
//       hh = 12;
//   }
//   if(hh > 12){
//       hh = hh - 12;
//       session = "PM";
//    }

//    hh = (hh < 10) ? "0" + hh : hh;
//    mm = (mm < 10) ? "0" + mm : mm;
//    ss = (ss < 10) ? "0" + ss : ss;
    
//    let time = hh + ":" + mm + ":" + ss + " " + session;

//   document.getElementById("clock").innerText = time; 
//   let t = setTimeout(function(){ currentTime() }, 1000);
// }

