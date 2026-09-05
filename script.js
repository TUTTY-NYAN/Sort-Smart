(function() {
    'use strict';

    // ---- STREAMS ----
    var STREAMS = {
        bio: { label: 'Bio (compostable)', color: '#3d7a5a', icon: '🌱' },
        nonbio: { label: 'Non-Bio (landfill)', color: '#8a7e6b', icon: '🗑️' },
        recyclable: { label: 'Recyclable', color: '#4a7a8a', icon: '♻️' },
        hazardous: { label: 'Hazardous', color: '#b87a4a', icon: '⚠️' }
    };

    // ---- DATABASE (SAME AS BEFORE) ----
    var DATABASE = [
        // BIO
        { keys: ['banana peel', 'apple core', 'fruit', 'vegetable scraps', 'food scraps', 'eggshell', 'avocado pit', 'melon rind'], stream: 'bio', note: 'Great for compost — breaks down naturally. Keep meat & dairy out of home compost.' },
        { keys: ['coffee grounds', 'coffee filter', 'tea bag', 'loose leaf tea'], stream: 'bio', note: 'Excellent compost material — adds nitrogen and breaks down quickly.' },
        { keys: ['napkin', 'paper towel', 'tissue', 'toilet paper', 'paper napkin'], stream: 'bio', note: 'Used paper towels and napkins are too soiled for recycling — compost them.' },
        { keys: ['plant', 'leaves', 'grass clippings', 'yard waste', 'branches', 'weeds', 'flowers', 'twigs'], stream: 'bio', note: 'Ideal for compost. Check if your municipality has yard-waste pickup.' },
        { keys: ['pizza box', 'greasy cardboard', 'oily cardboard'], stream: 'bio', note: 'Grease-stained cardboard contaminates recycling — compost or landfill it.' },
        { keys: ['paper plate', 'paper bowl', 'uncoated paper cup'], stream: 'bio', note: 'If uncoated and food-soiled, compost. Waxed or plastic-lined → non-bio.' },
        { keys: ['wood chips', 'sawdust', 'cardboard egg carton', 'untreated wood'], stream: 'bio', note: 'Natural wood and untreated cardboard can go into compost.' },
        { keys: ['cotton ball', 'cotton pad', 'natural fabric', 'wool', 'hemp'], stream: 'bio', note: '100% cotton, wool, or hemp without synthetics can be composted.' },
        { keys: ['hair', 'fur', 'feathers', 'pet fur'], stream: 'bio', note: 'Can be composted — breaks down slowly but adds nutrients.' },
        { keys: ['cork', 'wine cork', 'natural cork'], stream: 'bio', note: 'Natural corks are biodegradable. Synthetic cork → non-bio.' },
        
        // RECYCLABLE
        { keys: ['plastic bottle', 'water bottle', 'soda bottle', 'drink bottle', 'pet bottle'], stream: 'recyclable', note: '♻️ Empty & rinse. Keep cap on. Most PET/HDPE bottles are widely recyclable.' },
        { keys: ['glass bottle', 'wine bottle', 'beer bottle', 'glass jar', 'mason jar'], stream: 'recyclable', note: '♻️ Rinse. Remove metal lids (recycle separately). Glass is infinitely recyclable.' },
        { keys: ['aluminum can', 'soda can', 'beer can', 'tin can', 'steel can', 'food can'], stream: 'recyclable', note: '♻️ Rinse. Metal cans are highly valuable and can be recycled infinitely.' },
        { keys: ['aluminum foil', 'foil'], stream: 'recyclable', note: '♻️ Clean foil (no food residue) can be balled up and recycled. Greasy foil → non-bio.' },
        { keys: ['cardboard box', 'cardboard', 'shipping box', 'amazon box', 'corrugated cardboard'], stream: 'recyclable', note: '♻️ Flatten. Remove tape and padding. Keep dry. One of the most recycled materials.' },
        { keys: ['paper', 'newspaper', 'magazine', 'envelope', 'mail', 'printer paper', 'office paper', 'notebook paper'], stream: 'recyclable', note: '♻️ Clean, dry paper is easily recycled. Shredded paper may need special handling.' },
        { keys: ['milk carton', 'juice box', 'tetra pak', 'soy milk carton'], stream: 'recyclable', note: '♻️ Rinse. Many curbside programs accept these cartons. Check local rules.' },
        { keys: ['yogurt container', 'yogurt cup', 'butter tub', 'sour cream container'], stream: 'recyclable', note: '♻️ Rinse. Most #5 (PP) containers are recyclable — check the number on bottom.' },
        { keys: ['plastic bottle cap', 'cap', 'lid', 'screw cap'], stream: 'recyclable', note: '♻️ Plastic caps are recyclable — keep them on the bottle or place separately.' },
        { keys: ['glass jar', 'jam jar', 'pickle jar', 'sauce jar'], stream: 'recyclable', note: '♻️ Rinse. Remove labels if possible. Glass is 100% recyclable.' },
        { keys: ['egg carton', 'paper egg carton'], stream: 'recyclable', note: '♻️ Paper egg cartons are recyclable. Foam or plastic ones → non-bio.' },
        { keys: ['newspaper', 'comics', 'catalog', 'phone book'], stream: 'recyclable', note: '♻️ Clean paper is highly recyclable. Remove plastic wrapping.' },
        { keys: ['cardboard tube', 'toilet paper roll', 'paper towel roll'], stream: 'recyclable', note: '♻️ Cardboard tubes are recyclable. Flatten to save space.' },
        { keys: ['envelope', 'window envelope'], stream: 'recyclable', note: '♻️ Most envelopes are recyclable. The plastic window is usually removed during processing.' },
        { keys: ['plastic container', 'tupperware', 'food storage container'], stream: 'recyclable', note: '♻️ If recyclable (#1, #2, #5), rinse and recycle. Otherwise non-bio.' },
        { keys: ['bottle', 'glass bottle', 'plastic bottle'], stream: 'recyclable', note: '♻️ Always rinse before recycling. Remove non-recyclable parts.' },
        
        // NON-BIO
        { keys: ['plastic bag', 'grocery bag', 'shopping bag', 'plastic wrap', 'cling film', 'saran wrap'], stream: 'nonbio', note: '❌ Film plastic jams recycling equipment. Drop off at store collection bins if available.' },
        { keys: ['plastic straw', 'straw', 'drinking straw'], stream: 'nonbio', note: '❌ Too small for recycling. Skip or use reusable alternatives.' },
        { keys: ['plastic cutlery', 'fork', 'spoon', 'knife', 'plastic knife'], stream: 'nonbio', note: '❌ Mixed plastics — not accepted in most curbside recycling.' },
        { keys: ['takeout container', 'styrofoam', 'polystyrene', 'foam container', 'foam cup'], stream: 'nonbio', note: '❌ Styrofoam is rarely accepted curbside. Some specialty recyclers exist.' },
        { keys: ['broken glass', 'drinking glass', 'window glass', 'mirror', 'ceramic', 'plate', 'mug', 'porcelain', 'pyrex'], stream: 'nonbio', note: '❌ Wrap sharp pieces. Ceramics & drinking glass contaminate glass recycling.' },
        { keys: ['coffee cup', 'paper cup', 'disposable cup', 'hot cup'], stream: 'nonbio', note: '❌ Most disposable cups have a plastic lining that prevents recycling.' },
        { keys: ['diaper', 'baby diaper', 'adult diaper'], stream: 'nonbio', note: '❌ Not recyclable or compostable. Dispose in landfill bin.' },
        { keys: ['clothes', 'clothing', 'shirt', 'fabric', 'textile', 'synthetic fabric', 'polyester'], stream: 'nonbio', note: '❌ Wearable? Donate. Unwearable? Check textile recycling bins.' },
        { keys: ['shoes', 'sneakers', 'boots', 'sandals'], stream: 'nonbio', note: '❌ Donate if wearable. Some brands recycle old shoes.' },
        { keys: ['rubber', 'latex glove', 'rubber band', 'silicone'], stream: 'nonbio', note: '❌ Not biodegradable. Dispose in landfill.' },
        { keys: ['foam', 'foam packaging', 'packing peanut', 'styrofoam peanut'], stream: 'nonbio', note: '❌ Foam packaging is not recyclable curbside — reuse or landfill.' },
        { keys: ['pens', 'markers', 'highlighters', 'pencil', 'mechanical pencil'], stream: 'nonbio', note: '❌ Mixed materials — not recyclable curbside. Check for specialty recycling.' },
        { keys: ['mask', 'face mask', 'gloves', 'disposable gloves', 'ppe'], stream: 'nonbio', note: '❌ Not recyclable. Dispose in landfill bin.' },
        { keys: ['chip bag', 'snack bag', 'foil pouch', 'stand-up pouch'], stream: 'nonbio', note: '❌ Multi-layer packaging is not recyclable. Some specialty programs exist.' },
        { keys: ['plastic wrap', 'shrink wrap', 'pallet wrap'], stream: 'nonbio', note: '❌ Film plastic is not accepted in most curbside recycling.' },
        { keys: ['cigarette butt', 'ash', 'cigar'], stream: 'nonbio', note: '❌ Not biodegradable. Dispose properly in landfill bin.' },
        { keys: ['dental floss', 'floss pick'], stream: 'nonbio', note: '❌ Not recyclable or compostable. Dispose in landfill.' },
        { keys: ['candle wax', 'candle', 'paraffin wax'], stream: 'nonbio', note: '❌ Not recyclable. Dispose in landfill. Soy wax is compostable.' },
        
        // HAZARDOUS
        { keys: ['battery', 'batteries', 'aa battery', 'aaa battery', 'lithium battery', 'coin battery', '9v battery'], stream: 'hazardous', note: '⚠️ Never trash or recycle — fire risk. Take to battery drop-off (hardware stores, electronics shops).' },
        { keys: ['light bulb', 'cfl bulb', 'fluorescent', 'led bulb', 'compact fluorescent'], stream: 'hazardous', note: '⚠️ CFL/fluorescent contain mercury — special drop-off required. Incandescent → landfill (wrapped).' },
        { keys: ['electronics', 'phone', 'laptop', 'computer', 'charger', 'cable', 'e-waste', 'tablet', 'monitor', 'tv'], stream: 'hazardous', note: '⚠️ E-waste contains valuable and hazardous materials. Look for e-waste recyclers or manufacturer take-back.' },
        { keys: ['paint', 'paint can', 'thinner', 'solvent', 'varnish', 'stain'], stream: 'hazardous', note: '⚠️ Leftover paint needs hazardous waste facility. Never pour down drain or trash.' },
        { keys: ['motor oil', 'engine oil', 'oil filter', 'transmission fluid'], stream: 'hazardous', note: '⚠️ Auto parts stores often accept used motor oil for free. Never pour down drain.' },
        { keys: ['medication', 'pills', 'medicine', 'prescription', 'over-the-counter', 'liquid medicine'], stream: 'hazardous', note: '⚠️ Many pharmacies have take-back boxes. Do not flush or trash.' },
        { keys: ['aerosol can', 'spray paint', 'deodorant can', 'hairspray', 'whipped cream can'], stream: 'hazardous', note: '⚠️ If not empty, treat as hazardous. Empty cans can go in metal recycling.' },
        { keys: ['cleaning product', 'bleach', 'ammonia', 'detergent', 'disinfectant', 'drain cleaner'], stream: 'hazardous', note: '⚠️ Household chemicals need hazardous waste disposal. Never mix.' },
        { keys: ['thermometer', 'mercury', 'barometer', 'blood pressure monitor'], stream: 'hazardous', note: '⚠️ Contains mercury — hazardous waste only.' },
        { keys: ['fertilizer', 'pesticide', 'herbicide', 'insecticide', 'weed killer'], stream: 'hazardous', note: '⚠️ Garden chemicals are hazardous. Take to hazardous waste facility.' }
    ];

    // ---- STATE ----
    var log = [];
    var pendingResult = null;
    var currentRange = 'week';
    var activeFilter = null;
    var RANGE_MS = { week: 7 * 86400000, month: 30 * 86400000, year: 365 * 86400000, all: Infinity };

    // ---- HELPERS ----
    function uid() { return Math.random().toString(36).slice(2, 10); }
    function normalize(s) { return s.trim().toLowerCase().replace(/\s+/g, ' '); }
    function escapeHtml(str) {
        var d = document.createElement('div');
        d.textContent = str == null ? '' : String(str);
        return d.innerHTML;
    }
    function titleCase(s) {
        return s.replace(/\w\S*/g, function(t) {
            return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
        });
    }
    function formatDate(ts) {
        var d = new Date(ts);
        var options = { month: 'short', day: 'numeric', year: 'numeric' };
        return d.toLocaleDateString('en-US', options);
    }
    function timeAgo(ts) {
        var diff = Date.now() - ts;
        var mins = Math.floor(diff / 60000);
        if (mins < 1) return 'just now';
        if (mins < 60) return mins + 'm ago';
        var hrs = Math.floor(mins / 60);
        if (hrs < 24) return hrs + 'h ago';
        var days = Math.floor(hrs / 24);
        if (days < 30) return days + 'd ago';
        var months = Math.floor(days / 30);
        if (months < 12) return months + 'mo ago';
        return Math.floor(months / 12) + 'y ago';
    }
    function checkIcon() { return '<i class="bi bi-check-circle-fill"></i>'; }
    function plusIcon() { return '<i class="bi bi-plus-circle"></i>'; }
    function xIcon() { return '<i class="bi bi-x-circle"></i>'; }

    // ---- CLASSIFY (Improved with word matching) ----
    function classify(rawInput) {
        var q = normalize(rawInput);
        if (!q) return null;
        var singular = q.replace(/s$/, '');
        
        // 1. Exact/Substring Match
        for (var i = 0; i < DATABASE.length; i++) {
            var entry = DATABASE[i];
            for (var j = 0; j < entry.keys.length; j++) {
                var key = entry.keys[j];
                if (q.indexOf(key) !== -1 || key.indexOf(q) !== -1 || singular.indexOf(key) !== -1) {
                    return { stream: entry.stream, note: entry.note, matchedKey: key };
                }
            }
        }

        // 2. Word-by-word fallback (e.g., "banana" matches "banana peel")
        var words = q.split(' ');
        for (var k = 0; k < DATABASE.length; k++) {
            var entry2 = DATABASE[k];
            for (var m = 0; m < entry2.keys.length; m++) {
                var key2 = entry2.keys[m];
                var keyWords = key2.split(' ');
                for (var w = 0; w < words.length; w++) {
                    if (keyWords.indexOf(words[w]) !== -1) {
                        return { stream: entry2.stream, note: entry2.note, matchedKey: key2 };
                    }
                }
            }
        }
        
        return null;
    }

    // ---- STORAGE ----
    var storage = {
        get: function(key) {
            return new Promise(function(resolve) {
                try { resolve({ value: localStorage.getItem(key) }); } catch (_) { resolve({ value: null }); }
            });
        },
        set: function(key, value) {
            return new Promise(function(resolve) {
                try { localStorage.setItem(key, value); resolve(true); } catch (_) { resolve(false); }
            });
        }
    };

    async function loadLog() {
        try {
            var result = await storage.get('wastewise-log-v2');
            log = result && result.value ? JSON.parse(result.value) : [];
        } catch (_) { log = []; }
    }

    async function persistLog() {
        try {
            var ok = await storage.set('wastewise-log-v2', JSON.stringify(log));
            showSaveError(!ok);
        } catch (_) { showSaveError(true); }
    }

    function showSaveError(hasError) {
        var slot = document.getElementById('save-error-slot');
        slot.innerHTML = hasError ?
            '<div class="save-error"><i class="bi bi-exclamation-triangle-fill" style="margin-right:8px;"></i>Changes aren\'t saving — they\'ll be lost on refresh.</div>' :
            '';
    }

    // ---- RENDER RESULT (Added Undo + Manual Logging for Unknown) ----
    function renderResult() {
        var area = document.getElementById('result-area');
        if (!pendingResult) { area.innerHTML = ''; return; }

        var r = pendingResult;

        if (r.stream === 'unknown') {
            var manualButtons = Object.keys(STREAMS).map(function(key) {
                return '<button class="manual-log-btn" data-stream="' + key + '">' + STREAMS[key].icon + ' ' + STREAMS[key].label + '</button>';
            }).join('');

            area.innerHTML =
                '<div class="result-card unknown">' +
                '<div class="result-top"><span class="result-stream"><span class="dot" style="background:#b5aba0;"></span>Not sure</span></div>' +
                '<p class="result-item-name">“' + escapeHtml(r.name) + '”</p>' +
                '<p class="result-note">Hmm, not in our list yet. Choose a category to log it manually:</p>' +
                '<div class="result-actions">' + manualButtons + '</div>' +
                '</div>';

            area.querySelectorAll('.manual-log-btn').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var stream = btn.getAttribute('data-stream');
                    logManualItem(r.name, stream);
                });
            });
            return;
        }

        var s = STREAMS[r.stream];
        var already = r.alreadyLogged || false;
        var labelWithIcon = s.icon + ' ' + s.label;

        var tipHtml = '';
        if (r.stream === 'recyclable') {
            tipHtml = '<div class="recycling-tip"><i class="bi bi-info-circle"></i> Check local rules — they vary by area.</div>';
        }

        area.innerHTML =
            '<div class="result-card ' + r.stream + '">' +
            '<div class="result-top">' +
            '<span class="result-stream"><span class="dot" style="background:' + s.color + ';"></span>' + labelWithIcon + '</span>' +
            '</div>' +
            '<p class="result-item-name">' + escapeHtml(r.name) + '</p>' +
            '<p class="result-note">' + escapeHtml(r.note) + '</p>' +
            tipHtml +
            '<div class="result-actions">' +
            (already ?
                '<span class="logged-check" id="logged-check-btn">' + checkIcon() + ' Logged</span><button class="manual-log-btn" id="undo-log-btn">Undo</button>' :
                '<button class="log-btn ' + r.stream + '" id="log-item-btn">' + plusIcon() + ' Log this</button>') +
            '</div>' +
            '</div>';

        var btn = document.getElementById('log-item-btn');
        if (btn) btn.addEventListener('click', logCurrentItem);
        
        var undoBtn = document.getElementById('undo-log-btn');
        if (undoBtn) undoBtn.addEventListener('click', undoLastLog);
    }

    // ---- LOG ITEM ----
    async function logCurrentItem() {
        if (!pendingResult || pendingResult.stream === 'unknown') return;
        var now = Date.now();
        log.unshift({ id: uid(), name: pendingResult.name, stream: pendingResult.stream, ts: now });
        pendingResult.alreadyLogged = true;
        await persistLog();
        renderResult();
        renderTotals();
        renderHistory();
    }

    async function logManualItem(name, stream) {
        var now = Date.now();
        log.unshift({ id: uid(), name: titleCase(name), stream: stream, ts: now });
        await persistLog();
        renderTotals();
        renderHistory();
        document.getElementById('item-input').value = '';
        pendingResult = null;
        renderResult();
    }

    async function undoLastLog() {
        if (log.length === 0) return;
        log.shift();
        if (pendingResult) pendingResult.alreadyLogged = false;
        await persistLog();
        renderResult();
        renderTotals();
        renderHistory();
    }

    // ---- RUN CHECK ----
    function runCheck() {
        var input = document.getElementById('item-input');
        var raw = input.value;
        if (!raw.trim()) return;
        var match = classify(raw);
        pendingResult = match ?
            { name: titleCase(raw.trim()), stream: match.stream, note: match.note, alreadyLogged: false } :
            { name: raw.trim(), stream: 'unknown' };
        renderResult();
    }

    // ---- TOTALS ----
    function renderTotals() {
        var cutoff = Date.now() - RANGE_MS[currentRange];
        var counts = { bio: 0, nonbio: 0, recyclable: 0, hazardous: 0 };
        log.forEach(function(entry) {
            if (currentRange === 'all' || entry.ts >= cutoff) {
                if (counts[entry.stream] !== undefined) counts[entry.stream]++;
            }
        });
        var grid = document.getElementById('totals-grid');
        var streamKeys = ['bio', 'nonbio', 'recyclable', 'hazardous'];
        grid.innerHTML = streamKeys.map(function(key) {
            var label = STREAMS[key].label.split(' ')[0];
            var isActive = (activeFilter === key);
            return '<div class="total-card ' + key + (isActive ? ' active-filter' : '') + '" data-stream="' + key + '">' +
                '<div class="total-label">' + label + ' ' + STREAMS[key].icon + '</div>' +
                '<div class="total-value">' + counts[key] + '</div>' +
                '</div>';
        }).join('');

        grid.querySelectorAll('.total-card').forEach(function(card) {
            card.addEventListener('click', function() {
                var stream = card.getAttribute('data-stream');
                toggleFilter(stream);
            });
        });
    }

    // ---- FILTER ----
    function toggleFilter(stream) {
        if (activeFilter === stream) {
            activeFilter = null;
        } else {
            activeFilter = stream;
        }
        renderTotals();
        renderHistory();
        updateFilterIndicator();
    }

    function updateFilterIndicator() {
        var indicator = document.getElementById('filter-indicator');
        var label = document.getElementById('filter-label');
        if (activeFilter && STREAMS[activeFilter]) {
            indicator.style.display = 'inline-flex';
            label.textContent = STREAMS[activeFilter].icon + ' ' + STREAMS[activeFilter].label;
        } else {
            indicator.style.display = 'none';
        }
    }

    document.getElementById('clear-filter-btn').addEventListener('click', function() {
        activeFilter = null;
        renderTotals();
        renderHistory();
        updateFilterIndicator();
    });

    // ---- HISTORY ----
    function renderHistory() {
        var list = document.getElementById('history-list');
        var filteredLog = activeFilter ? log.filter(function(e) { return e.stream === activeFilter; }) : log;

        if (filteredLog.length === 0) {
            if (activeFilter) {
                list.innerHTML = '<div class="history-empty"><i class="bi bi-funnel" style="margin-right:6px;"></i>No items in "' + STREAMS[activeFilter].label + '" yet.</div>';
            } else {
                list.innerHTML = '<div class="history-empty"><i class="bi bi-inbox" style="margin-right:6px;"></i>Nothing logged yet — try checking an item above.</div>';
            }
            return;
        }

        list.innerHTML = filteredLog.slice(0, 30).map(function(entry) {
            var s = STREAMS[entry.stream];
            var badgeClass = entry.stream;
            var badgeLabel = entry.stream === 'bio' ? 'Bio' :
                entry.stream === 'nonbio' ? 'Non-Bio' :
                entry.stream === 'recyclable' ? 'Recyclable' : 'Hazardous';
            var dateStr = formatDate(entry.ts);
            var timeAgoStr = timeAgo(entry.ts);
            return '<div class="history-row">' +
                '<span class="history-dot" style="background:' + s.color + ';"></span>' +
                '<span class="history-name">' + escapeHtml(entry.name) + '</span>' +
                '<span class="history-badge ' + badgeClass + '">' + badgeLabel + '</span>' +
                '<span class="history-date"><i class="bi bi-calendar3"></i> ' + dateStr + ' <span style="color:#b5aba0;margin:0 4px;">·</span> ' + timeAgoStr + '</span>' +
                '<button class="history-remove" data-id="' + entry.id + '" title="Remove">' + xIcon() + '</button>' +
                '</div>';
        }).join('');

        list.querySelectorAll('.history-remove').forEach(function(btn) {
            btn.addEventListener('click', async function() {
                log = log.filter(function(e) { return e.id !== btn.getAttribute('data-id'); });
                await persistLog();
                renderTotals();
                renderHistory();
            });
        });
    }

    // ---- SUGGESTIONS ----
    var SAMPLE_ITEMS = ['banana peel', 'plastic bottle', 'glass jar', 'pizza box', 'battery', 'aluminum can', 'newspaper', 'coffee grounds'];

    function renderSuggestions() {
        var el = document.getElementById('suggestions');
        el.innerHTML = SAMPLE_ITEMS.map(function(s) {
            return '<button class="suggestion-chip" data-item="' + escapeHtml(s) + '">' + escapeHtml(s) + '</button>';
        }).join('');
        el.querySelectorAll('.suggestion-chip').forEach(function(chip) {
            chip.addEventListener('click', function() {
                document.getElementById('item-input').value = chip.getAttribute('data-item');
                runCheck();
            });
        });
    }

    // ---- EXPORT DATA ----
    function exportData() {
        if (log.length === 0) {
            alert('No data to export yet!');
            return;
        }
        var dataStr = JSON.stringify(log, null, 2);
        var blob = new Blob([dataStr], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'sortsmart-history-' + new Date().toISOString().slice(0,10) + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ---- EVENTS ----
    document.getElementById('check-btn').addEventListener('click', runCheck);
    document.getElementById('item-input').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') runCheck();
    });
    document.getElementById('export-btn').addEventListener('click', exportData);

    document.getElementById('range-toggle').addEventListener('click', function(e) {
        var btn = e.target.closest('.range-btn');
        if (!btn) return;
        currentRange = btn.getAttribute('data-range');
        document.querySelectorAll('.range-btn').forEach(function(b) {
            b.classList.toggle('active', b === btn);
        });
        renderTotals();
        renderHistory();
    });

    document.getElementById('clear-history').addEventListener('click', async function() {
        if (log.length === 0) return;
        if (!confirm('Clear all logged items?')) return;
        log = [];
        activeFilter = null;
        updateFilterIndicator();
        await persistLog();
        renderTotals();
        renderHistory();
        if (pendingResult) pendingResult.alreadyLogged = false;
        renderResult();
    });

    // ---- INIT ----
    async function init() {
        renderSuggestions();
        await loadLog();
        renderTotals();
        renderHistory();
        updateFilterIndicator();
    }

    init();

})();