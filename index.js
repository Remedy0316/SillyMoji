// SillyMoji - Kaomoji Picker Extension for SillyTavern
// Adds a kaomoji picker button to the right side of the chat input bar.

const KAOMOJI = {
    'Happy': [
        '(◕‿◕)', '(✿◠‿◠)', 'ヽ(>∀<☆)ノ', '(≧▽≦)', '(◠‿◠)', '(☆▽☆)',
        '(✧ω✧)', '(＾▽＾)', '٩(◕‿◕｡)۶', '(ノ´ヮ`)ノ*: ・゚✧', '(⌒‿⌒)',
        '☆*:.｡.o(≧▽≦)o.｡.:*☆', '(｡♥‿♥｡)', 'ヽ(♡‿♡)ノ', '(◕ᴗ◕✿)',
        '(✯◡✯)', '(◠‿◠✿)', '(ᵔᴥᵔ)', '(*≧ω≦)', '(∗´꒳`)',
    ],
    'Sad': [
        '(╥_╥)', '(;ω;)', '(T_T)', '(ノ_<。)', '(´;ω;`)',
        '(っ˘̩╭╮˘̩)っ', '(´・ω・`)', '(◞‸◟)', '(｡•́︿•̀｡)', '(இ﹏இ)',
        '(╯︵╰,)', '(˘̩̩̩ε˘̩ƪ)', '( ´_ゝ`)', '〒▽〒', '(T▽T)',
        '(ಥ﹏ಥ)', 'ε(´сω`)з', '(;´༎ຶД༎ຶ`)', '(´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥`)',
    ],
    'Angry': [
        '(╯°□°)╯︵ ┻━┻', '(ノಠ益ಠ)ノ彡┻━┻', '(ง\'̀-\'́)ง', '(≖_≖ )',
        '(ಠ_ಠ)', '(¬_¬)', '(ᗒᗣᗕ)՞', '(╬ Ò﹏Ó)', '(‡▼益▼)',
        'щ(ʘ╻ʘ)щ', '(ᕗ ͠° ਊ ͠° )ᕗ', '(눈_눈)', '(¬▂¬)', '(>_<)',
        '┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻', '(ノ°Д°）ノ︵ ┻━┻',
    ],
    'Love': [
        '(♥ω♥*)', '(◍•ᴗ•◍)❤', '(´,,•ω•,,)♡', '♡(◡‿◡)', '(♡˙︶˙♡)',
        '(灬♥ω♥灬)', '(*♡∀♡)', '(´∩｡• ᵕ •｡∩`)', '(⺣◡⺣)♡*',
        '(♡ >ω< ♡)', '(*˘︶˘*).｡*♡', '(✿ ♥‿♥)', '(˘∀˘)/(μ‿μ) ❤',
        '(´♡‿♡`)', '(*¯ ³¯*)♡', '(人 •͈ᴗ•͈)', '♡＾▽＾♡',
    ],
    'Surprise': [
        '(⊙_⊙)', 'Σ(°△°|||)', '(°ロ°) !', '(O_O)', '(゜-゜)',
        'Σ(°Д°)', '(⊙ˍ⊙)', '(o_O)', '!!!(╬⓪益⓪)', '(✧Д✧)',
        '(*°▽°*)', '(ʘᗩʘ\')', 'w(°ｏ°)w', '(○_○)', '(☉_☉)',
    ],
    'Greeting': [
        '(｡◕‿◕｡)/', 'ヾ(^▽^*)))', '(◕‿◕)ノ', '(*・ω・)ﾉ',
        '(°▽°)/☆', 'ヾ(・ω・)メ', '(＾▽＾)ゞ', '(^-^)ノ',
        '＼(◎o◎)／', '( ´ ▽ ` )ﾉ', '(*≧▽≦)ﾉ', '(°◡°♡)',
    ],
    'Shrug': [
        '¯\\_(ツ)_/¯', '┐(´∀`)┌', '╮(╯_╰)╭', '┐(´～`)┌',
        '¯\\(°_o)/¯', '╮(╯▽╰)╭', '┐(˘_˘)┌', '╮( ˘ ▽ ˘ )╭',
        '┐( ˘_˘)┌', '¯\\_( ͡° ͜ʖ ͡°)_/¯',
    ],
    'Animals': [
        '(=^・^=)', 'ʕ•ᴥ•ʔ', '(°◇°♡)', '(⁎˃ᆺ˂)', '(=①ω①=)',
        '(◕ᴥ◕)', 'ʕ·ᴥ·ʔ', '(·ω·)', 'U・ᴥ・U', '(^・ω・^ )',
        '≧◇≦', 'ʕ·ᴥ·ʔ☆', '(=^-ω-^=)', 'ᕦʕ •ᴥ•ʔᕤ', '(ᵔᴥᵔ)',
        '( ̄(エ) ̄)', '(・⊝・)', 'ʕ→ᴥ←ʔ',
    ],
    'Table Flip': [
        '(╯°□°)╯︵ ┻━┻', '┬─┬ノ( º _ ºノ)', '(ノ-_-)ノ ~┻━┻',
        '┻━┻ ︵ ¯\\(ツ)/¯ ︵ ┻━┻', '(ノ ゜Д゜)ノ ︵ ┻━┻',
        '┬─┬⃰͡ (ᵔᵕᵔ͜ )', '(ノ͡° ͜ʖ ͡°)ノ︵ ┻━┻', '┬──┬◡ﾉ(° -°ﾉ)',
    ],
    'Sparkle': [
        '(ノ◕ヮ◕)ノ*:・゚✧', '✧(≖ ◡ ≖✿)', '(ﾉ´ヮ`)ﾉ*: ・゚✧',
        '✧・゚:*✧・゚:*( ͡ᵔ ͜ʖ ͡ᵔ)*:・゚✧*:・゚✧', '.｡*ﾟ+.*.｡(❁´◡`❁)｡.｡:+*',
        '☆ﾟ.*･｡ﾟ', '(✨_✨)', '✧*。٩(ˊᗜˋ*)و✧*。', '⊂(✧ω✧)⊃',
    ],
    'Lenny': [
        '( ͡° ͜ʖ ͡°)', '( ͡~ ͜ʖ ͡°)', '( ͡° ͜ʖ ͡ °)', '(͠≖ ͜ʖ͠≖)',
        '( ͡ᵔ ͜ʖ ͡ᵔ)', '(☞ ͡° ͜ʖ ͡°)☞', '¯\\_( ͡° ͜ʖ ͡°)_/¯',
        '( ͡° ᴥ ͡° ʋ)', '( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)',
    ],
};

const CATEGORY_ICONS = {
    'Happy': 'fa-face-laugh-beam',
    'Sad': 'fa-face-sad-tear',
    'Angry': 'fa-face-angry',
    'Love': 'fa-heart',
    'Surprise': 'fa-face-surprise',
    'Greeting': 'fa-hand',
    'Shrug': 'fa-question',
    'Animals': 'fa-paw',
    'Table Flip': 'fa-table',
    'Sparkle': 'fa-wand-magic-sparkles',
    'Lenny': 'fa-face-grin-wink',
};

let pickerOpen = false;
let activeCategory = 'Happy';
let recentKaomoji = [];

const MAX_RECENT = 20;
const STORAGE_KEY = 'sillymoji_recent';

function loadRecent() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            recentKaomoji = JSON.parse(saved);
        }
    } catch {
        recentKaomoji = [];
    }
}

function saveRecent() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentKaomoji));
}

function addToRecent(kaomoji) {
    recentKaomoji = recentKaomoji.filter(k => k !== kaomoji);
    recentKaomoji.unshift(kaomoji);
    if (recentKaomoji.length > MAX_RECENT) {
        recentKaomoji = recentKaomoji.slice(0, MAX_RECENT);
    }
    saveRecent();
}

function insertKaomoji(kaomoji) {
    const textarea = $('#send_textarea');
    if (!textarea.length) return;

    const el = textarea[0];
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const before = text.substring(0, start);
    const after = text.substring(end);

    // Add space before if there's text and no trailing space
    const spaceBefore = before.length > 0 && !before.endsWith(' ') && !before.endsWith('\n') ? ' ' : '';
    const newText = before + spaceBefore + kaomoji + after;

    el.value = newText;
    el.focus();

    const cursorPos = start + spaceBefore.length + kaomoji.length;
    el.selectionStart = cursorPos;
    el.selectionEnd = cursorPos;

    // Trigger input event so SillyTavern registers the change
    textarea.trigger('input');

    addToRecent(kaomoji);
    closePicker();
}

function buildCategoryTabs() {
    let html = '<div class="sillymoji-tab" data-category="Recent"><i class="fa-solid fa-clock-rotate-left"></i></div>';
    for (const [name, icon] of Object.entries(CATEGORY_ICONS)) {
        const activeClass = name === activeCategory ? ' active' : '';
        html += `<div class="sillymoji-tab${activeClass}" data-category="${name}" title="${name}"><i class="fa-solid ${icon}"></i></div>`;
    }
    return html;
}

function buildKaomojiGrid(category) {
    const list = category === 'Recent' ? recentKaomoji : (KAOMOJI[category] || []);
    if (list.length === 0) {
        return '<div class="sillymoji-empty">No recent kaomoji yet!</div>';
    }
    return list.map(k => `<div class="sillymoji-item" title="Click to insert">${k}</div>`).join('');
}

function buildSearchResults(query) {
    const lower = query.toLowerCase();
    const results = [];
    for (const [cat, list] of Object.entries(KAOMOJI)) {
        if (cat.toLowerCase().includes(lower)) {
            results.push(...list);
        }
    }
    // Also search in the kaomoji themselves
    if (results.length === 0) {
        for (const list of Object.values(KAOMOJI)) {
            for (const k of list) {
                if (k.toLowerCase().includes(lower)) {
                    results.push(k);
                }
            }
        }
    }
    if (results.length === 0) {
        return '<div class="sillymoji-empty">No kaomoji found (╥_╥)</div>';
    }
    return results.map(k => `<div class="sillymoji-item" title="Click to insert">${k}</div>`).join('');
}

function buildPicker() {
    return `
        <div id="sillymoji-picker">
            <div class="sillymoji-header">
                <div class="sillymoji-search-wrap">
                    <i class="fa-solid fa-magnifying-glass sillymoji-search-icon"></i>
                    <input type="text" id="sillymoji-search" placeholder="Search categories..." autocomplete="off" />
                </div>
            </div>
            <div class="sillymoji-tabs">
                ${buildCategoryTabs()}
            </div>
            <div class="sillymoji-grid">
                ${buildKaomojiGrid(activeCategory)}
            </div>
        </div>
    `;
}

function openPicker() {
    if (pickerOpen) {
        closePicker();
        return;
    }

    $('#sillymoji-picker').remove();

    const pickerHtml = buildPicker();
    $('#sillymoji-wrapper').append(pickerHtml);

    // Bind events
    $('.sillymoji-tab').on('click', function () {
        const category = $(this).data('category');
        activeCategory = category;
        $('.sillymoji-tab').removeClass('active');
        $(this).addClass('active');
        $('.sillymoji-grid').html(buildKaomojiGrid(category));
        $('#sillymoji-search').val('');
        bindGridItems();
    });

    $('#sillymoji-search').on('input', function () {
        const query = $(this).val().trim();
        if (query.length === 0) {
            $('.sillymoji-grid').html(buildKaomojiGrid(activeCategory));
            $('.sillymoji-tab').removeClass('active');
            $(`.sillymoji-tab[data-category="${activeCategory}"]`).addClass('active');
        } else {
            $('.sillymoji-grid').html(buildSearchResults(query));
            $('.sillymoji-tab').removeClass('active');
        }
        bindGridItems();
    });

    bindGridItems();
    pickerOpen = true;
    $('#sillymoji_button').addClass('active');
}

function bindGridItems() {
    $('.sillymoji-item').off('click').on('click', function () {
        insertKaomoji($(this).text());
    });
}

function closePicker() {
    $('#sillymoji-picker').remove();
    pickerOpen = false;
    $('#sillymoji_button').removeClass('active');
}

// Close picker when clicking outside
$(document).on('click', function (e) {
    if (pickerOpen && !$(e.target).closest('#sillymoji-picker, #sillymoji_button').length) {
        closePicker();
    }
});

// Close picker on Escape
$(document).on('keydown', function (e) {
    if (e.key === 'Escape' && pickerOpen) {
        closePicker();
    }
});

// Init
jQuery(async () => {
    loadRecent();

    const wrapper = $('<div id="sillymoji-wrapper"></div>');
    const button = $(`
        <div id="sillymoji_button" class="interactable" title="Kaomoji Picker" tabindex="0">
            <span class="sillymoji-btn-icon">ツ</span>
        </div>
    `);

    wrapper.append(button);
    $('#rightSendForm').prepend(wrapper);

    button.on('click', (e) => {
        e.stopPropagation();
        openPicker();
    });
});
