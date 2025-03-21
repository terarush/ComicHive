(async function () {
    function setSpasi() {
      const spasiElements = document.querySelectorAll("[data-spasi]");

      spasiElements.forEach((spasiElement) => {
        const cssValue = spasiElement.dataset.spasi;
        const dotElement = spasiElement.querySelector(".dot");

        let lightValue = 255 - 50 * Number(cssValue);
        
        if (lightValue < 0) lightValue = 0;
        
        dotElement.style.backgroundColor = `rgb(${lightValue}, ${lightValue}, ${lightValue})`;
        spasiElement.style.paddingLeft = cssValue + "rem";
      });
    }

    const { pathname } = location;

    if (pathname.endsWith(".html") || pathname.endsWith(".html/")) {
      location.replace("/");
    }

    const rootElement = document.getElementById("root");

    rootElement.innerHTML = `<h1 class="text-center p-8 text-lg text-gray-500 dark:text-gray-300">Loading...</h1>`;

    const response = await fetch(pathname + "/view-data");
    const { data } = await response.json();
    
    if (!response.ok) {
      rootElement.innerHTML = `<h1 class="text-center p-8 text-lg text-red-500 dark:text-red-400">${response.status} ${response.statusText}</h1>`;
    } else {
      if (data) {
        document.title = data.title;

        rootElement.innerHTML = `
          <div class="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
            <div class="card-wrapper mt-4">
              ${data.routesView
                .map((route) => {
                  return `
                    <div class="card bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mt-2">
                      <h4 class="text-lg font-semibold">${route.title}</h4>
                      <p class="text-sm"><span class="font-bold">Get</span> : <a href="${data.baseUrlPath + route.route}" target="_blank" class="text-blue-500 dark:text-blue-400 underline">${data.baseUrlPath + route.route}</a></p>
                      <p class="text-sm"><span class="font-bold">Route Params</span> : <span class="text-gray-500">${route.routeParams?.length > 0 ? "" : "none"}</span></p>
                      ${
                        route.routeParams?.length > 0
                        ?
                          route.routeParams.map((routeParam) => {
                            return `
                              <p data-spasi="1" class="text-sm"><span class="font-bold">Placeholder</span> : <span class="text-gray-400">${routeParam.placeholder}</span></p>
                              <p data-spasi="1" class="text-sm"><span class="font-bold">Value</span> :</p>
                              <p data-spasi="2" class="text-sm"><span class="font-bold">Type</span> : <span class="text-gray-400">${routeParam.value.type}</span></p>
                              <p data-spasi="2" class="text-sm"><span class="font-bold">Default Value</span> : <span class="text-gray-400">${routeParam.value.default ? routeParam.value.default : "none"}</span></p>
                              <p data-spasi="2" class="text-sm"><span class="font-bold">Required</span> : <span class="text-gray-400">${routeParam.value.required ? "Yes" : "No"}</span></p>
                            `;
                          }).join("")
                        :
                          ""
                      }
                      <p class="text-sm"><span class="font-bold">Query Params</span> : <span class="text-gray-500">${route.queryParams && route.queryParams.length > 0 ? "" : "none"}</span></p>
                      ${
                        route.queryParams?.length > 0
                        ?
                          route.queryParams
                            .map((queryParam) => {
                              return `
                                <p data-spasi="1" class="text-sm"><span class="font-bold">Key</span> : <span class="text-gray-400">${queryParam.key}</span></p>
                                <p data-spasi="1" class="text-sm"><span class="font-bold">Value</span> :</p>
                                <p data-spasi="2" class="text-sm"><span class="font-bold">Type</span> : <span class="text-gray-400">${queryParam.value.type}</span></p>
                                <p data-spasi="2" class="text-sm"><span class="font-bold">Default Value</span> : <span class="text-gray-400">${queryParam.value.default ? queryParam.value.default : "none"}</span></p>
                                <p data-spasi="2" class="text-sm"><span class="font-bold">Required</span> : <span class="text-gray-400">${queryParam.value.required ? "Yes" : "No"}</span></p>
                              `;
                            })
                            .join("")
                        :
                          ""
                      }
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>
        `;

        setSpasi();
      }
    }
})();

