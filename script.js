;(function () {
  'use strict'

  var STREAMS = {
   recycling: { label: 'Recycling', color: '#00ff00' },
       compost: { label: 'Compost', color: '#ff9900' },
       landfill: { label: 'Landfill', color: '#ff0000' },
       hazardous: { label: 'Hazardous', color: '#adadeb' }
  }

  var DATABASE = [
    {
      keys: ['plastic bottle', 'water bottle', 'soda bottle', 'pet bottle'],
      stream: 'recycling',
      note: 'Empty and rinse it out, then recycle with the cap on. PET and HDPE bottles are widely accepted curbside.'
    },
    {
      keys: [
        'plastic bag',
        'grocery bag',
        'shopping bag',
        'plastic wrap',
        'cling film'
      ],
      stream: 'landfill',
      note: "Most curbside programs don't take film plastic \u2014 it jams sorting equipment. Many grocery stores have a drop-off bin for it instead."
    },
    {
      keys: ['plastic straw', 'straw'],
      stream: 'landfill',
      note: 'Too small and lightweight for recycling sorters. Skip it where possible or switch to reusable.'
    },
    {
      keys: [
        'plastic cutlery',
        'plastic fork',
        'plastic spoon',
        'plastic knife'
      ],
      stream: 'landfill',
      note: "Mixed or unmarked plastics like this usually aren't accepted by recycling facilities."
    },
    {
      keys: ['yogurt container', 'yogurt cup'],
      stream: 'recycling',
      note: 'Rinse residue out first. Check the number on the bottom \u2014 most #5 (PP) containers are accepted.'
    },
    {
      keys: [
        'takeout container',
        'styrofoam',
        'polystyrene',
        'foam container',
        'foam cup'
      ],
      stream: 'landfill',
      note: "Styrofoam isn't accepted by most curbside recycling. Some specialty facilities take it \u2014 worth checking locally."
    },
    {
      keys: ['glass bottle', 'wine bottle', 'beer bottle', 'glass jar'],
      stream: 'recycling',
      note: "Rinse it out. Lids can usually go in too, separately if they're metal."
    },
    {
      keys: [
        'broken glass',
        'drinking glass',
        'window glass',
        'mirror',
        'ceramic',
        'plate',
        'mug',
        'porcelain'
      ],
      stream: 'landfill',
      note: 'Wrap sharp pieces before disposal. Ceramics and drinking glass melt at a different temperature than bottle glass, so they contaminate glass recycling.'
    },
    {
      keys: [
        'aluminum can',
        'soda can',
        'beer can',
        'tin can',
        'steel can',
        'food can'
      ],
      stream: 'recycling',
      note: 'Give it a quick rinse. Metal cans are one of the most valuable and widely recyclable materials.'
    },
    {
      keys: ['aluminum foil', 'foil'],
      stream: 'recycling',
      note: 'Clean foil (no food residue) can be balled up and recycled with metals. Greasy foil should go to landfill.'
    },
    {
      keys: ['cardboard box', 'cardboard', 'shipping box', 'amazon box'],
      stream: 'recycling',
      note: 'Flatten it and remove excess tape or packing material. Keep it dry.'
    },
    {
      keys: ['pizza box'],
      stream: 'compost',
      note: "Grease-stained cardboard contaminates paper recycling. If it's mostly clean, recycle the clean parts; if greasy throughout, compost or landfill it."
    },
    {
      keys: [
        'paper',
        'newspaper',
        'magazine',
        'envelope',
        'mail',
        'printer paper',
        'office paper'
      ],
      stream: 'recycling',
      note: 'Clean, dry paper is one of the easiest things to recycle. Shredded paper often needs to be bagged \u2014 check local rules.'
    },
    {
      keys: ['napkin', 'paper towel', 'tissue'],
      stream: 'compost',
      note: 'Used paper towels and napkins are too contaminated for paper recycling, but they break down fine in compost.'
    },
    {
      keys: ['coffee cup', 'paper cup'],
      stream: 'landfill',
      note: "Most disposable cups have a plastic lining that isn't separable at most facilities, so they can't be recycled curbside."
    },
    {
      keys: ['coffee grounds', 'coffee filter', 'tea bag'],
      stream: 'compost',
      note: 'Great for compost \u2014 grounds and paper filters break down quickly and add nitrogen.'
    },
    {
      keys: [
        'banana peel',
        'apple core',
        'fruit',
        'vegetable scraps',
        'food scraps',
        'eggshell'
      ],
      stream: 'compost',
      note: 'Classic compost material. Keep meat, dairy, and oily foods out of home compost bins.'
    },
    {
      keys: ['meat', 'bones', 'dairy', 'cheese', 'oil', 'grease'],
      stream: 'landfill',
      note: "These attract pests and don't break down well in home compost \u2014 most curbside programs exclude them too. Check if your area has an industrial composting program that accepts them."
    },
    {
      keys: ['battery', 'batteries'],
      stream: 'hazardous',
      note: 'Never put batteries in the regular trash or recycling \u2014 they can spark fires. Drop them off at a battery recycling point (many hardware and electronics stores have one).'
    },
    {
      keys: ['light bulb', 'led bulb', 'cfl bulb', 'fluorescent'],
      stream: 'hazardous',
      note: 'CFL and fluorescent bulbs contain trace mercury and need special drop-off. Regular incandescent bulbs go to landfill wrapped to avoid injury.'
    },
    {
      keys: [
        'electronics',
        'phone',
        'laptop',
        'computer',
        'charger',
        'cable',
        'e-waste'
      ],
      stream: 'hazardous',
      note: "Electronics contain materials that shouldn't go to landfill. Look for an e-waste recycling drop-off or manufacturer take-back program."
    },
    {
      keys: ['paint', 'paint can'],
      stream: 'hazardous',
      note: "Leftover paint needs a household hazardous waste facility \u2014 don't pour it down a drain or put it in the trash."
    },
    {
      keys: ['motor oil', 'engine oil'],
      stream: 'hazardous',
      note: 'Take it to an auto parts store or hazardous waste facility \u2014 most will accept used motor oil for free.'
    },
    {
      keys: ['medication', 'pills', 'medicine'],
      stream: 'hazardous',
      note: "Many pharmacies have a take-back box. Don't flush medication or throw it in regular trash."
    },
    {
      keys: ['diaper'],
      stream: 'landfill',
      note: "Diapers aren't recyclable or compostable in standard systems due to the mixed materials and contamination."
    },
    {
      keys: ['clothes', 'clothing', 'shirt', 'fabric', 'textile'],
      stream: 'landfill',
      note: "Worn-out textiles aren't accepted by curbside recycling. If wearable, donate instead \u2014 many areas also have textile-specific recycling bins."
    },
    {
      keys: ['shoes', 'sneakers'],
      stream: 'landfill',
      note: 'Donate if wearable. Some shoe brands run take-back programs that recycle materials into new products.'
    },
    {
      keys: [
        'cardboard milk carton',
        'milk carton',
        'juice box',
        'juice carton',
        'tetra pak'
      ],
      stream: 'recycling',
      note: 'Rinse it out. These cartons have a paper-plastic-foil layering that many curbside programs now accept \u2014 check locally if unsure.'
    },
    {
      keys: ['plant', 'leaves', 'grass clippings', 'yard waste', 'branches'],
      stream: 'compost',
      note: 'Yard waste is ideal compost material, or check for a municipal yard-waste pickup.'
    }
  ]

  var log = []
  var pendingResult = null

  function uid () {
    return Math.random().toString(36).slice(2, 10)
  }
  function normalize (s) {
    return s.trim().toLowerCase().replace(/\s+/g, ' ')
  }

  function classify (rawInput) {
    var q = normalize(rawInput)
    if (!q) return null
    var singular = q.replace(/s$/, '')
    for (var i = 0; i < DATABASE.length; i++) {
      var entry = DATABASE[i]
      for (var j = 0; j < entry.keys.length; j++) {
        var key = entry.keys[j]
        if (
          q.indexOf(key) !== -1 ||
          key.indexOf(q) !== -1 ||
          singular.indexOf(key) !== -1
        ) {
          return { stream: entry.stream, note: entry.note, matchedKey: key }
        }
      }
    }
    return null
  }

  async function loadLog () {
    try {
      var result = await window.storage.get('sorted-log')
      log = result && result.value ? JSON.parse(result.value) : []
    } catch (e) {
      log = []
    }
  }

  async function persistLog () {
    try {
      var result = await window.storage.set('sorted-log', JSON.stringify(log))
      showSaveError(!result)
    } catch (e) {
      showSaveError(true)
    }
  }

  function showSaveError (hasError) {
    var slot = document.getElementById('save-error-slot')
    slot.innerHTML = hasError
      ? '<div class="save-error">Changes aren\u2019t saving right now \u2014 they\u2019ll be lost on refresh.</div>'
      : ''
  }

  function renderResult () {
    var area = document.getElementById('result-area')
    if (!pendingResult) {
      area.innerHTML = ''
      return
    }

    var r = pendingResult

    if (r.stream === 'unknown') {
      area.innerHTML =
        '<div class="result-card unknown">' +
        '<p class="result-item-name">Not sure about \u201c' +
        escapeHtml(r.name) +
        '\u201d</p>' +
        '<p class="result-note">This item isn\u2019t in the lookup yet. Check your local waste authority\u2019s guide, or try a more common name for it (e.g. "bottle" instead of a brand name).</p>' +
        '</div>'
      return
    }

    var s = STREAMS[r.stream]
    area.innerHTML =
      '<div class="result-card ' +
      r.stream +
      '">' +
      '<div class="result-top">' +
      '<span class="result-stream" style="color:' +
      s.color +
      '"><span class="dot" style="background:' +
      s.color +
      '"></span>' +
      s.label +
      '</span>' +
      '</div>' +
      '<p class="result-item-name">' +
      escapeHtml(r.name) +
      '</p>' +
      '<p class="result-note">' +
      escapeHtml(r.note) +
      '</p>' +
      '<div class="result-actions">' +
      (r.alreadyLogged
        ? '<span class="logged-check">' + checkIcon() + ' Logged</span>'
        : '<button class="log-btn ' +
          r.stream +
          '" id="log-item-btn">' +
          plusIcon() +
          ' Log this item</button>') +
      '</div>' +
      '</div>'

    var btn = document.getElementById('log-item-btn')
    if (btn) btn.addEventListener('click', logCurrentItem)
  }

  function checkIcon () {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>'
  }
  function plusIcon () {
    return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>'
  }
  function xIcon () {
    return '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>'
  }

  function escapeHtml (str) {
    var div = document.createElement('div')
    div.textContent = str == null ? '' : String(str)
    return div.innerHTML
  }

  async function logCurrentItem () {
    if (!pendingResult || pendingResult.stream === 'unknown') return
    log.unshift({
      id: uid(),
      name: pendingResult.name,
      stream: pendingResult.stream,
      ts: Date.now()
    })
    pendingResult.alreadyLogged = true
    await persistLog()
    renderResult()
    renderTotals()
    renderHistory()
  }

  function runCheck () {
    var input = document.getElementById('item-input')
    var raw = input.value
    if (!raw.trim()) return
    var match = classify(raw)
    pendingResult = match
      ? {
          name: titleCase(raw.trim()),
          stream: match.stream,
          note: match.note,
          alreadyLogged: false
        }
      : { name: raw.trim(), stream: 'unknown' }
    renderResult()
  }

  function titleCase (s) {
    return s.replace(/\w\S*/g, function (t) {
      return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()
    })
  }

  var currentRange = 'week'
  var RANGE_MS = {
    week: 7 * 86400000,
    month: 30 * 86400000,
    year: 365 * 86400000,
    all: Infinity
  }

  function renderTotals () {
    var cutoff = Date.now() - RANGE_MS[currentRange]
    var counts = { recycling: 0, compost: 0, landfill: 0, hazardous: 0 }
    log.forEach(function (entry) {
      if (currentRange === 'all' || entry.ts >= cutoff) counts[entry.stream]++
    })
    var grid = document.getElementById('totals-grid')
    grid.innerHTML = Object.keys(STREAMS)
      .map(function (key) {
        return (
          '<div class="total-card ' +
          key +
          '">' +
          '<div class="total-label">' +
          STREAMS[key].label.split(' ')[0] +
          '</div>' +
          '<div class="total-value mono">' +
          counts[key] +
          '</div>' +
          '</div>'
        )
      })
      .join('')
  }

  function renderHistory () {
    var list = document.getElementById('history-list')
    if (log.length === 0) {
      list.innerHTML =
        '<div class="history-empty">Nothing logged yet \u2014 check an item above and log it to start tracking.</div>'
      return
    }
    list.innerHTML = log
      .slice(0, 30)
      .map(function (entry) {
        var s = STREAMS[entry.stream]
        return (
          '<div class="history-row">' +
          '<span class="history-dot" style="background:' +
          s.color +
          '"></span>' +
          '<span class="history-name">' +
          escapeHtml(entry.name) +
          '</span>' +
          '<span class="history-time">' +
          timeAgo(entry.ts) +
          '</span>' +
          '<button class="history-remove" data-id="' +
          entry.id +
          '" title="Remove">' +
          xIcon() +
          '</button>' +
          '</div>'
        )
      })
      .join('')

    list.querySelectorAll('.history-remove').forEach(function (btn) {
      btn.addEventListener('click', async function () {
        log = log.filter(function (e) {
          return e.id !== btn.getAttribute('data-id')
        })
        await persistLog()
        renderTotals()
        renderHistory()
      })
    })
  }

  function timeAgo (ts) {
    var diff = Date.now() - ts
    var mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return mins + 'm ago'
    var hrs = Math.floor(mins / 60)
    if (hrs < 24) return hrs + 'h ago'
    var days = Math.floor(hrs / 24)
    if (days < 30) return days + 'd ago'
    var months = Math.floor(days / 30)
    if (months < 12) return months + 'mo ago'
    return Math.floor(months / 12) + 'y ago'
  }

  var SAMPLE_ITEMS = [
    
  ]
  function renderSuggestions () {
    var el = document.getElementById('suggestions')
    el.innerHTML = SAMPLE_ITEMS.map(function (s) {
      return (
        '<button class="suggestion-chip" data-item="' +
        escapeHtml(s) +
        '">' +
        escapeHtml(s) +
        '</button>'
      )
    }).join('')
    el.querySelectorAll('.suggestion-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.getElementById('item-input').value =
          chip.getAttribute('data-item')
        runCheck()
      })
    })
  }

  document.getElementById('check-btn').addEventListener('click', runCheck)
  document
    .getElementById('item-input')
    .addEventListener('keydown', function (e) {
      if (e.key === 'Enter') runCheck()
    })

  document
    .getElementById('range-toggle')
    .addEventListener('click', function (e) {
      var btn = e.target.closest('.range-btn')
      if (!btn) return
      currentRange = btn.getAttribute('data-range')
      document.querySelectorAll('.range-btn').forEach(function (b) {
        b.classList.toggle('active', b === btn)
      })
      renderTotals()
    })

  document
    .getElementById('clear-history')
    .addEventListener('click', async function () {
      if (log.length === 0) return
      log = []
      await persistLog()
      renderTotals()
      renderHistory()
    })

  async function init () {
    renderSuggestions()
    await loadLog()
    renderTotals()
    renderHistory()
  }

  init()
})()
