var QR = function() {
    // alignment pattern
    var adelta = [ 0, 11, 15, 19, 23, 27, 31, // force 1 pat
    16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28 ];
    // version block
        var vpat = [ 3220, 1468, 2713, 1235, 3062, 1890, 2119, 1549, 2344, 2936, 1117, 2583, 1330, 2470, 1667, 2249, 2028, 3780, 481, 4011, 142, 3098, 831, 3445, 592, 2517, 1776, 2234, 1951, 2827, 1070, 2660, 1345, 3177 ];
    // final format bits with mask: level << 3 | mask
        var fmtword = [ 30660, 29427, 32170, 30877, 26159, 25368, 27713, 26998, //L
    21522, 20773, 24188, 23371, 17913, 16590, 20375, 19104, //M
    13663, 12392, 16177, 14854, 9396, 8579, 11994, 11245, //Q
    5769, 5054, 7399, 6608, 1890, 597, 3340, 2107 ];
    // 4 per version: number of blocks 1,2; data width; ecc width
        var eccblocks = [ 1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30 ];
    // Galois field log table
        var glog = [ 255, 0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175 ];
    // Galios field exponent table
        var gexp = [ 1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 0 ];
    // Working buffers:
    // data input and ecc append, image working buffer, fixed part of image, run lengths for badness
        var strinbuf = [], eccbuf = [], qrframe = [], framask = [], rlens = [];
    // Control values - width is based on version, last 4 are from table.
        var version, width, neccblk1, neccblk2, datablkw, eccblkwid;
    var ecclevel = 2;
    // set bit to indicate cell in qrframe is immutable.  symmetric around diagonal
        function setmask(x, y) {
        var bt;
        if (x > y) {
            bt = x;
            x = y;
            y = bt;
        }
        // y*y = 1+3+5...
                bt = y;
        bt *= y;
        bt += y;
        bt >>= 1;
        bt += x;
        framask[bt] = 1;
    }
    // enter alignment pattern - black to qrframe, white to mask (later black frame merged to mask)
        function putalign(x, y) {
        var j;
        qrframe[x + width * y] = 1;
        for (j = -2; j < 2; j++) {
            qrframe[x + j + width * (y - 2)] = 1;
            qrframe[x - 2 + width * (y + j + 1)] = 1;
            qrframe[x + 2 + width * (y + j)] = 1;
            qrframe[x + j + 1 + width * (y + 2)] = 1;
        }
        for (j = 0; j < 2; j++) {
            setmask(x - 1, y + j);
            setmask(x + 1, y - j);
            setmask(x - j, y - 1);
            setmask(x + j, y + 1);
        }
    }
    //========================================================================
    // Reed Solomon error correction
    // exponentiation mod N
        function modnn(x) {
        while (x >= 255) {
            x -= 255;
            x = (x >> 8) + (x & 255);
        }
        return x;
    }
    var genpoly = [];
    // Calculate and append ECC data to data block.  Block is in strinbuf, indexes to buffers given.
        function appendrs(data, dlen, ecbuf, eclen) {
        var i, j, fb;
        for (i = 0; i < eclen; i++) {
            strinbuf[ecbuf + i] = 0;
        }
        for (i = 0; i < dlen; i++) {
            fb = glog[strinbuf[data + i] ^ strinbuf[ecbuf]];
            if (fb != 255) /* fb term is non-zero */
            for (j = 1; j < eclen; j++) {
                strinbuf[ecbuf + j - 1] = strinbuf[ecbuf + j] ^ gexp[modnn(fb + genpoly[eclen - j])];
            } else for (j = ecbuf; j < ecbuf + eclen; j++) {
                strinbuf[j] = strinbuf[j + 1];
            }
            strinbuf[ecbuf + eclen - 1] = fb == 255 ? 0 : gexp[modnn(fb + genpoly[0])];
        }
    }
    //========================================================================
    // Frame data insert following the path rules
    // check mask - since symmetrical use half.
        function ismasked(x, y) {
        var bt;
        if (x > y) {
            bt = x;
            x = y;
            y = bt;
        }
        bt = y;
        bt += y * y;
        bt >>= 1;
        bt += x;
        return framask[bt];
    }
    //========================================================================
    //  Apply the selected mask out of the 8.
        function applymask(m) {
        var x, y, r3x, r3y;
        switch (m) {
          case 0:
            for (y = 0; y < width; y++) {
                for (x = 0; x < width; x++) {
                    if (!(x + y & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                }
            }
            break;

          case 1:
            for (y = 0; y < width; y++) {
                for (x = 0; x < width; x++) {
                    if (!(y & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                }
            }
            break;

          case 2:
            for (y = 0; y < width; y++) {
                for (r3x = 0, x = 0; x < width; x++, r3x++) {
                    if (r3x == 3) r3x = 0;
                    if (!r3x && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                }
            }
            break;

          case 3:
            for (r3y = 0, y = 0; y < width; y++, r3y++) {
                if (r3y == 3) r3y = 0;
                for (r3x = r3y, x = 0; x < width; x++, r3x++) {
                    if (r3x == 3) r3x = 0;
                    if (!r3x && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                }
            }
            break;

          case 4:
            for (y = 0; y < width; y++) {
                for (r3x = 0, r3y = y >> 1 & 1, x = 0; x < width; x++, r3x++) {
                    if (r3x == 3) {
                        r3x = 0;
                        r3y = !r3y;
                    }
                    if (!r3y && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                }
            }
            break;

          case 5:
            for (r3y = 0, y = 0; y < width; y++, r3y++) {
                if (r3y == 3) r3y = 0;
                for (r3x = 0, x = 0; x < width; x++, r3x++) {
                    if (r3x == 3) r3x = 0;
                    if (!((x & y & 1) + !(!r3x | !r3y)) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                }
            }
            break;

          case 6:
            for (r3y = 0, y = 0; y < width; y++, r3y++) {
                if (r3y == 3) r3y = 0;
                for (r3x = 0, x = 0; x < width; x++, r3x++) {
                    if (r3x == 3) r3x = 0;
                    if (!((x & y & 1) + (r3x && r3x == r3y) & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                }
            }
            break;

          case 7:
            for (r3y = 0, y = 0; y < width; y++, r3y++) {
                if (r3y == 3) r3y = 0;
                for (r3x = 0, x = 0; x < width; x++, r3x++) {
                    if (r3x == 3) r3x = 0;
                    if (!((r3x && r3x == r3y) + (x + y & 1) & 1) && !ismasked(x, y)) qrframe[x + y * width] ^= 1;
                }
            }
            break;
        }
        return;
    }
    // Badness coefficients.
        var N1 = 3, N2 = 3, N3 = 40, N4 = 10;
    // Using the table of the length of each run, calculate the amount of bad image 
    // - long runs or those that look like finders; called twice, once each for X and Y
        function badruns(length) {
        var i;
        var runsbad = 0;
        for (i = 0; i <= length; i++) {
            if (rlens[i] >= 5) runsbad += N1 + rlens[i] - 5;
        }
        // BwBBBwB as in finder
                for (i = 3; i < length - 1; i += 2) {
            if (rlens[i - 2] == rlens[i + 2] && rlens[i + 2] == rlens[i - 1] && rlens[i - 1] == rlens[i + 1] && rlens[i - 1] * 3 == rlens[i] && (rlens[i - 3] == 0 || i + 3 > length || rlens[i - 3] * 3 >= rlens[i] * 4 || rlens[i + 3] * 3 >= rlens[i] * 4)) runsbad += N3;
        }
        return runsbad;
    }
    // Calculate how bad the masked image is - blocks, imbalance, runs, or finders.
        function badcheck() {
        var x, y, h, b, b1;
        var thisbad = 0;
        var bw = 0;
        // blocks of same color.
                for (y = 0; y < width - 1; y++) {
            for (x = 0; x < width - 1; x++) {
                if (qrframe[x + width * y] && qrframe[x + 1 + width * y] && qrframe[x + width * (y + 1)] && qrframe[x + 1 + width * (y + 1)] || // all black
                !(qrframe[x + width * y] || qrframe[x + 1 + width * y] || qrframe[x + width * (y + 1)] || qrframe[x + 1 + width * (y + 1)])) // all white
                thisbad += N2;
            }
        }
        // X runs
                for (y = 0; y < width; y++) {
            rlens[0] = 0;
            for (h = b = x = 0; x < width; x++) {
                if ((b1 = qrframe[x + width * y]) == b) rlens[h]++; else rlens[++h] = 1;
                b = b1;
                bw += b ? 1 : -1;
            }
            thisbad += badruns(h);
        }
        // black/white imbalance
                if (bw < 0) bw = -bw;
        var big = bw;
        var count = 0;
        big += big << 2;
        big <<= 1;
        while (big > width * width) {
            big -= width * width, count++;
        }
        thisbad += count * N4;
        // Y runs
                for (x = 0; x < width; x++) {
            rlens[0] = 0;
            for (h = b = y = 0; y < width; y++) {
                if ((b1 = qrframe[x + width * y]) == b) rlens[h]++; else rlens[++h] = 1;
                b = b1;
            }
            thisbad += badruns(h);
        }
        return thisbad;
    }
    function genframe(instring) {
        var x, y, k, t, v, i, j, m;
        // find the smallest version that fits the string
                t = instring.length;
        version = 0;
        do {
            version++;
            k = (ecclevel - 1) * 4 + (version - 1) * 16;
            neccblk1 = eccblocks[k++];
            neccblk2 = eccblocks[k++];
            datablkw = eccblocks[k++];
            eccblkwid = eccblocks[k];
            k = datablkw * (neccblk1 + neccblk2) + neccblk2 - 3 + (version <= 9);
            if (t <= k) break;
        } while (version < 40);
        // FIXME - insure that it fits insted of being truncated
                width = 17 + 4 * version;
        // allocate, clear and setup data structures
                v = datablkw + (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;
        for (t = 0; t < v; t++) {
            eccbuf[t] = 0;
        }
        strinbuf = instring.slice(0);
        for (t = 0; t < width * width; t++) {
            qrframe[t] = 0;
        }
        for (t = 0; t < (width * (width + 1) + 1) / 2; t++) {
            framask[t] = 0;
        }
        // insert finders - black to frame, white to mask
                for (t = 0; t < 3; t++) {
            k = 0;
            y = 0;
            if (t == 1) k = width - 7;
            if (t == 2) y = width - 7;
            qrframe[y + 3 + width * (k + 3)] = 1;
            for (x = 0; x < 6; x++) {
                qrframe[y + x + width * k] = 1;
                qrframe[y + width * (k + x + 1)] = 1;
                qrframe[y + 6 + width * (k + x)] = 1;
                qrframe[y + x + 1 + width * (k + 6)] = 1;
            }
            for (x = 1; x < 5; x++) {
                setmask(y + x, k + 1);
                setmask(y + 1, k + x + 1);
                setmask(y + 5, k + x);
                setmask(y + x + 1, k + 5);
            }
            for (x = 2; x < 4; x++) {
                qrframe[y + x + width * (k + 2)] = 1;
                qrframe[y + 2 + width * (k + x + 1)] = 1;
                qrframe[y + 4 + width * (k + x)] = 1;
                qrframe[y + x + 1 + width * (k + 4)] = 1;
            }
        }
        // alignment blocks
                if (version > 1) {
            t = adelta[version];
            y = width - 7;
            for (;;) {
                x = width - 7;
                while (x > t - 3) {
                    putalign(x, y);
                    if (x < t) break;
                    x -= t;
                }
                if (y <= t + 9) break;
                y -= t;
                putalign(6, y);
                putalign(y, 6);
            }
        }
        // single black
                qrframe[8 + width * (width - 8)] = 1;
        // timing gap - mask only
                for (y = 0; y < 7; y++) {
            setmask(7, y);
            setmask(width - 8, y);
            setmask(7, y + width - 7);
        }
        for (x = 0; x < 8; x++) {
            setmask(x, 7);
            setmask(x + width - 8, 7);
            setmask(x, width - 8);
        }
        // reserve mask-format area
                for (x = 0; x < 9; x++) {
            setmask(x, 8);
        }
        for (x = 0; x < 8; x++) {
            setmask(x + width - 8, 8);
            setmask(8, x);
        }
        for (y = 0; y < 7; y++) {
            setmask(8, y + width - 7);
        }
        // timing row/col
                for (x = 0; x < width - 14; x++) {
            if (x & 1) {
                setmask(8 + x, 6);
                setmask(6, 8 + x);
            } else {
                qrframe[8 + x + width * 6] = 1;
                qrframe[6 + width * (8 + x)] = 1;
            }
        }
        // version block
                if (version > 6) {
            t = vpat[version - 7];
            k = 17;
            for (x = 0; x < 6; x++) {
                for (y = 0; y < 3; y++, k--) {
                    if (1 & (k > 11 ? version >> k - 12 : t >> k)) {
                        qrframe[5 - x + width * (2 - y + width - 11)] = 1;
                        qrframe[2 - y + width - 11 + width * (5 - x)] = 1;
                    } else {
                        setmask(5 - x, 2 - y + width - 11);
                        setmask(2 - y + width - 11, 5 - x);
                    }
                }
            }
        }
        // sync mask bits - only set above for white spaces, so add in black bits
                for (y = 0; y < width; y++) {
            for (x = 0; x <= y; x++) {
                if (qrframe[x + width * y]) setmask(x, y);
            }
        }
        // convert string to bitstream
        // 8 bit data to QR-coded 8 bit data (numeric or alphanum, or kanji not supported)
                v = strinbuf.length;
        // string to array
                for (i = 0; i < v; i++) {
            eccbuf[i] = strinbuf.charCodeAt(i);
        }
        strinbuf = eccbuf.slice(0);
        // calculate max string length
                x = datablkw * (neccblk1 + neccblk2) + neccblk2;
        if (v >= x - 2) {
            v = x - 2;
            if (version > 9) v--;
        }
        // shift and repack to insert length prefix
                i = v;
        if (version > 9) {
            strinbuf[i + 2] = 0;
            strinbuf[i + 3] = 0;
            while (i--) {
                t = strinbuf[i];
                strinbuf[i + 3] |= 255 & t << 4;
                strinbuf[i + 2] = t >> 4;
            }
            strinbuf[2] |= 255 & v << 4;
            strinbuf[1] = v >> 4;
            strinbuf[0] = 64 | v >> 12;
        } else {
            strinbuf[i + 1] = 0;
            strinbuf[i + 2] = 0;
            while (i--) {
                t = strinbuf[i];
                strinbuf[i + 2] |= 255 & t << 4;
                strinbuf[i + 1] = t >> 4;
            }
            strinbuf[1] |= 255 & v << 4;
            strinbuf[0] = 64 | v >> 4;
        }
        // fill to end with pad pattern
                i = v + 3 - (version < 10);
        while (i < x) {
            strinbuf[i++] = 236;
            // buffer has room    if (i == x)      break;
                        strinbuf[i++] = 17;
        }
        // calculate and append ECC
        // calculate generator polynomial
                genpoly[0] = 1;
        for (i = 0; i < eccblkwid; i++) {
            genpoly[i + 1] = 1;
            for (j = i; j > 0; j--) {
                genpoly[j] = genpoly[j] ? genpoly[j - 1] ^ gexp[modnn(glog[genpoly[j]] + i)] : genpoly[j - 1];
            }
            genpoly[0] = gexp[modnn(glog[genpoly[0]] + i)];
        }
        for (i = 0; i <= eccblkwid; i++) {
            genpoly[i] = glog[genpoly[i]];
        }
        // use logs for genpoly[] to save calc step
        // append ecc to data buffer
                k = x;
        y = 0;
        for (i = 0; i < neccblk1; i++) {
            appendrs(y, datablkw, k, eccblkwid);
            y += datablkw;
            k += eccblkwid;
        }
        for (i = 0; i < neccblk2; i++) {
            appendrs(y, datablkw + 1, k, eccblkwid);
            y += datablkw + 1;
            k += eccblkwid;
        }
        // interleave blocks
                y = 0;
        for (i = 0; i < datablkw; i++) {
            for (j = 0; j < neccblk1; j++) {
                eccbuf[y++] = strinbuf[i + j * datablkw];
            }
            for (j = 0; j < neccblk2; j++) {
                eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];
            }
        }
        for (j = 0; j < neccblk2; j++) {
            eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];
        }
        for (i = 0; i < eccblkwid; i++) {
            for (j = 0; j < neccblk1 + neccblk2; j++) {
                eccbuf[y++] = strinbuf[x + i + j * eccblkwid];
            }
        }
        strinbuf = eccbuf;
        // pack bits into frame avoiding masked area.
                x = y = width - 1;
        k = v = 1;
        // up, minus
        /* inteleaved data and ecc codes */        m = (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;
        for (i = 0; i < m; i++) {
            t = strinbuf[i];
            for (j = 0; j < 8; j++, t <<= 1) {
                if (128 & t) qrframe[x + width * y] = 1;
                do {
                    // find next fill position
                    if (v) x--; else {
                        x++;
                        if (k) {
                            if (y != 0) y--; else {
                                x -= 2;
                                k = !k;
                                if (x == 6) {
                                    x--;
                                    y = 9;
                                }
                            }
                        } else {
                            if (y != width - 1) y++; else {
                                x -= 2;
                                k = !k;
                                if (x == 6) {
                                    x--;
                                    y -= 8;
                                }
                            }
                        }
                    }
                    v = !v;
                } while (ismasked(x, y));
            }
        }
        // save pre-mask copy of frame
                strinbuf = qrframe.slice(0);
        t = 0;
        // best
                y = 3e4;
        // demerit
        // for instead of while since in original arduino code
        // if an early mask was "good enough" it wouldn't try for a better one
        // since they get more complex and take longer.
                for (k = 0; k < 8; k++) {
            applymask(k);
            // returns black-white imbalance
                        x = badcheck();
            if (x < y) {
                // current mask better than previous best?
                y = x;
                t = k;
            }
            if (t == 7) break;
            // don't increment i to a void redoing mask
                        qrframe = strinbuf.slice(0);
            // reset for next pass
                }
        if (t != k) // redo best mask - none good enough, last wasn't t
        applymask(t);
        // add in final mask/ecclevel bytes
                y = fmtword[t + (ecclevel - 1 << 3)];
        // low byte
                for (k = 0; k < 8; k++, y >>= 1) {
            if (y & 1) {
                qrframe[width - 1 - k + width * 8] = 1;
                if (k < 6) qrframe[8 + width * k] = 1; else qrframe[8 + width * (k + 1)] = 1;
            }
        }
        // high byte
                for (k = 0; k < 7; k++, y >>= 1) {
            if (y & 1) {
                qrframe[8 + width * (width - 7 + k)] = 1;
                if (k) qrframe[6 - k + width * 8] = 1; else qrframe[7 + width * 8] = 1;
            }
        }
        // return image
                return qrframe;
    }
    var _canvas = null, _size = null;
    var api = {
        get ecclevel() {
            return ecclevel;
        },
        set ecclevel(val) {
            ecclevel = val;
        },
        get size() {
            return _size;
        },
        set size(val) {
            _size = val;
        },
        get canvas() {
            return _canvas;
        },
        set canvas(el) {
            _canvas = el;
        },
        getFrame: function getFrame(string) {
            return genframe(string);
        },
        draw: function draw(string, canvas, size, ecc) {
            ecclevel = ecc || ecclevel;
            canvas = canvas || _canvas;
            if (!canvas) {
                console.warn("No canvas provided to draw QR code in!");
                return;
            }
            size = size || _size || Math.min(canvas.width, canvas.height);
            var frame = genframe(string), ctx = canvas.ctx, px = Math.round(size / width);
            var roundedSize = px * width, offset = Math.floor((size - roundedSize) / 2);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.setFillStyle("#000000");
            for (var i = 0; i < width; i++) {
                for (var j = 0; j < width; j++) {
                    if (frame[j * width + i]) {
                        ctx.fillRect(px * i + offset, px * j + offset, px, px);
                    }
                }
            }
            ctx.draw();
        }
    };
    module.exports = {
        api: api
    };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInFyY29kZS5qcyJdLCJuYW1lcyI6WyJRUiIsImFkZWx0YSIsInZwYXQiLCJmbXR3b3JkIiwiZWNjYmxvY2tzIiwiZ2xvZyIsImdleHAiLCJzdHJpbmJ1ZiIsImVjY2J1ZiIsInFyZnJhbWUiLCJmcmFtYXNrIiwicmxlbnMiLCJ2ZXJzaW9uIiwid2lkdGgiLCJuZWNjYmxrMSIsIm5lY2NibGsyIiwiZGF0YWJsa3ciLCJlY2NibGt3aWQiLCJlY2NsZXZlbCIsInNldG1hc2siLCJ4IiwieSIsImJ0IiwicHV0YWxpZ24iLCJqIiwibW9kbm4iLCJnZW5wb2x5IiwiYXBwZW5kcnMiLCJkYXRhIiwiZGxlbiIsImVjYnVmIiwiZWNsZW4iLCJpIiwiZmIiLCJpc21hc2tlZCIsImFwcGx5bWFzayIsIm0iLCJyM3giLCJyM3kiLCJOMSIsIk4yIiwiTjMiLCJONCIsImJhZHJ1bnMiLCJsZW5ndGgiLCJydW5zYmFkIiwiYmFkY2hlY2siLCJoIiwiYiIsImIxIiwidGhpc2JhZCIsImJ3IiwiYmlnIiwiY291bnQiLCJnZW5mcmFtZSIsImluc3RyaW5nIiwiayIsInQiLCJ2Iiwic2xpY2UiLCJjaGFyQ29kZUF0IiwiX2NhbnZhcyIsIl9zaXplIiwiYXBpIiwidmFsIiwic2l6ZSIsImNhbnZhcyIsImVsIiwiZ2V0RnJhbWUiLCJzdHJpbmciLCJkcmF3IiwiZWNjIiwiY29uc29sZSIsIndhcm4iLCJNYXRoIiwibWluIiwiaGVpZ2h0IiwiZnJhbWUiLCJjdHgiLCJweCIsInJvdW5kIiwicm91bmRlZFNpemUiLCJvZmZzZXQiLCJmbG9vciIsImNsZWFyUmVjdCIsInNldEZpbGxTdHlsZSIsImZpbGxSZWN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxLQUFNLFlBQVk7O0FBRWxCO0FBQ0EsUUFBSUMsU0FBUyxDQUNYLENBRFcsRUFDUixFQURRLEVBQ0osRUFESSxFQUNBLEVBREEsRUFDSSxFQURKLEVBQ1EsRUFEUixFQUNZLEVBRFosRUFDZ0I7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LGdCQUFJb0UsY0FBY0YsS0FBS2xFLEtBQXZCO0FBQUEsZ0JBQ0lxRSxTQUFTUixLQUFLUyxLQUFMLENBQVcsQ0FBQ2xCLE9BQU9nQixXQUFSLElBQXVCLENBQWxDLENBRGI7O0FBR0FILGdCQUFJTSxTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQmxCLE9BQU9yRCxLQUEzQixFQUFrQ3FELE9BQU9VLE1BQXpDO0FBQ0FFLGdCQUFJTyxZQUFKLENBQWlCLFNBQWpCOztBQUVBLGlCQUFLLElBQUlyRCxJQUFJLENBQWIsRUFBZ0JBLElBQUluQixLQUFwQixFQUEyQm1CLEdBQTNCLEVBQWdDO0FBQzVCLHFCQUFLLElBQUlSLElBQUksQ0FBYixFQUFnQkEsSUFBSVgsS0FBcEIsRUFBMkJXLEdBQTNCLEVBQWdDO0FBQzVCLHdCQUFJcUQsTUFBTXJELElBQUlYLEtBQUosR0FBWW1CLENBQWxCLENBQUosRUFBMEI7QUFDdEI4Qyw0QkFBSVEsUUFBSixDQUFhUCxLQUFLL0MsQ0FBTCxHQUFTa0QsTUFBdEIsRUFBOEJILEtBQUt2RCxDQUFMLEdBQVMwRCxNQUF2QyxFQUErQ0gsRUFBL0MsRUFBbURBLEVBQW5EO0FBQ0g7QUFDSjtBQUNKO0FBQ0RELGdCQUFJUixJQUFKO0FBQ0g7QUE1REssS0FBVjs7QUErREFpQixXQUFPQyxPQUFQLEdBQWlCO0FBQ2J6QixhQUFLQTtBQURRLEtBQWpCO0FBSUgsQ0F2d0JRLEVBQVQiLCJmaWxlIjoicXJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFFSID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIC8vIGFsaWdubWVudCBwYXR0ZXJuXG4gICAgdmFyIGFkZWx0YSA9IFtcbiAgICAgIDAsIDExLCAxNSwgMTksIDIzLCAyNywgMzEsIC8vIGZvcmNlIDEgcGF0XG4gICAgICAxNiwgMTgsIDIwLCAyMiwgMjQsIDI2LCAyOCwgMjAsIDIyLCAyNCwgMjQsIDI2LCAyOCwgMjgsIDIyLCAyNCwgMjQsXG4gICAgICAyNiwgMjYsIDI4LCAyOCwgMjQsIDI0LCAyNiwgMjYsIDI2LCAyOCwgMjgsIDI0LCAyNiwgMjYsIDI2LCAyOCwgMjhcbiAgICAgIF07XG5cbiAgICAvLyB2ZXJzaW9uIGJsb2NrXG4gICAgdmFyIHZwYXQgPSBbXG4gICAgICAgIDB4Yzk0LCAweDViYywgMHhhOTksIDB4NGQzLCAweGJmNiwgMHg3NjIsIDB4ODQ3LCAweDYwZCxcbiAgICAgICAgMHg5MjgsIDB4Yjc4LCAweDQ1ZCwgMHhhMTcsIDB4NTMyLCAweDlhNiwgMHg2ODMsIDB4OGM5LFxuICAgICAgICAweDdlYywgMHhlYzQsIDB4MWUxLCAweGZhYiwgMHgwOGUsIDB4YzFhLCAweDMzZiwgMHhkNzUsXG4gICAgICAgIDB4MjUwLCAweDlkNSwgMHg2ZjAsIDB4OGJhLCAweDc5ZiwgMHhiMGIsIDB4NDJlLCAweGE2NCxcbiAgICAgICAgMHg1NDEsIDB4YzY5XG4gICAgXTtcblxuICAgIC8vIGZpbmFsIGZvcm1hdCBiaXRzIHdpdGggbWFzazogbGV2ZWwgPDwgMyB8IG1hc2tcbiAgICB2YXIgZm10d29yZCA9IFtcbiAgICAgICAgMHg3N2M0LCAweDcyZjMsIDB4N2RhYSwgMHg3ODlkLCAweDY2MmYsIDB4NjMxOCwgMHg2YzQxLCAweDY5NzYsICAgIC8vTFxuICAgICAgICAweDU0MTIsIDB4NTEyNSwgMHg1ZTdjLCAweDViNGIsIDB4NDVmOSwgMHg0MGNlLCAweDRmOTcsIDB4NGFhMCwgICAgLy9NXG4gICAgICAgIDB4MzU1ZiwgMHgzMDY4LCAweDNmMzEsIDB4M2EwNiwgMHgyNGI0LCAweDIxODMsIDB4MmVkYSwgMHgyYmVkLCAgICAvL1FcbiAgICAgICAgMHgxNjg5LCAweDEzYmUsIDB4MWNlNywgMHgxOWQwLCAweDA3NjIsIDB4MDI1NSwgMHgwZDBjLCAweDA4M2IgICAgLy9IXG4gICAgXTtcblxuICAgIC8vIDQgcGVyIHZlcnNpb246IG51bWJlciBvZiBibG9ja3MgMSwyOyBkYXRhIHdpZHRoOyBlY2Mgd2lkdGhcbiAgICB2YXIgZWNjYmxvY2tzID0gW1xuICAgICAgICAxLCAwLCAxOSwgNywgMSwgMCwgMTYsIDEwLCAxLCAwLCAxMywgMTMsIDEsIDAsIDksIDE3LFxuICAgICAgICAxLCAwLCAzNCwgMTAsIDEsIDAsIDI4LCAxNiwgMSwgMCwgMjIsIDIyLCAxLCAwLCAxNiwgMjgsXG4gICAgICAgIDEsIDAsIDU1LCAxNSwgMSwgMCwgNDQsIDI2LCAyLCAwLCAxNywgMTgsIDIsIDAsIDEzLCAyMixcbiAgICAgICAgMSwgMCwgODAsIDIwLCAyLCAwLCAzMiwgMTgsIDIsIDAsIDI0LCAyNiwgNCwgMCwgOSwgMTYsXG4gICAgICAgIDEsIDAsIDEwOCwgMjYsIDIsIDAsIDQzLCAyNCwgMiwgMiwgMTUsIDE4LCAyLCAyLCAxMSwgMjIsXG4gICAgICAgIDIsIDAsIDY4LCAxOCwgNCwgMCwgMjcsIDE2LCA0LCAwLCAxOSwgMjQsIDQsIDAsIDE1LCAyOCxcbiAgICAgICAgMiwgMCwgNzgsIDIwLCA0LCAwLCAzMSwgMTgsIDIsIDQsIDE0LCAxOCwgNCwgMSwgMTMsIDI2LFxuICAgICAgICAyLCAwLCA5NywgMjQsIDIsIDIsIDM4LCAyMiwgNCwgMiwgMTgsIDIyLCA0LCAyLCAxNCwgMjYsXG4gICAgICAgIDIsIDAsIDExNiwgMzAsIDMsIDIsIDM2LCAyMiwgNCwgNCwgMTYsIDIwLCA0LCA0LCAxMiwgMjQsXG4gICAgICAgIDIsIDIsIDY4LCAxOCwgNCwgMSwgNDMsIDI2LCA2LCAyLCAxOSwgMjQsIDYsIDIsIDE1LCAyOCxcbiAgICAgICAgNCwgMCwgODEsIDIwLCAxLCA0LCA1MCwgMzAsIDQsIDQsIDIyLCAyOCwgMywgOCwgMTIsIDI0LFxuICAgICAgICAyLCAyLCA5MiwgMjQsIDYsIDIsIDM2LCAyMiwgNCwgNiwgMjAsIDI2LCA3LCA0LCAxNCwgMjgsXG4gICAgICAgIDQsIDAsIDEwNywgMjYsIDgsIDEsIDM3LCAyMiwgOCwgNCwgMjAsIDI0LCAxMiwgNCwgMTEsIDIyLFxuICAgICAgICAzLCAxLCAxMTUsIDMwLCA0LCA1LCA0MCwgMjQsIDExLCA1LCAxNiwgMjAsIDExLCA1LCAxMiwgMjQsXG4gICAgICAgIDUsIDEsIDg3LCAyMiwgNSwgNSwgNDEsIDI0LCA1LCA3LCAyNCwgMzAsIDExLCA3LCAxMiwgMjQsXG4gICAgICAgIDUsIDEsIDk4LCAyNCwgNywgMywgNDUsIDI4LCAxNSwgMiwgMTksIDI0LCAzLCAxMywgMTUsIDMwLFxuICAgICAgICAxLCA1LCAxMDcsIDI4LCAxMCwgMSwgNDYsIDI4LCAxLCAxNSwgMjIsIDI4LCAyLCAxNywgMTQsIDI4LFxuICAgICAgICA1LCAxLCAxMjAsIDMwLCA5LCA0LCA0MywgMjYsIDE3LCAxLCAyMiwgMjgsIDIsIDE5LCAxNCwgMjgsXG4gICAgICAgIDMsIDQsIDExMywgMjgsIDMsIDExLCA0NCwgMjYsIDE3LCA0LCAyMSwgMjYsIDksIDE2LCAxMywgMjYsXG4gICAgICAgIDMsIDUsIDEwNywgMjgsIDMsIDEzLCA0MSwgMjYsIDE1LCA1LCAyNCwgMzAsIDE1LCAxMCwgMTUsIDI4LFxuICAgICAgICA0LCA0LCAxMTYsIDI4LCAxNywgMCwgNDIsIDI2LCAxNywgNiwgMjIsIDI4LCAxOSwgNiwgMTYsIDMwLFxuICAgICAgICAyLCA3LCAxMTEsIDI4LCAxNywgMCwgNDYsIDI4LCA3LCAxNiwgMjQsIDMwLCAzNCwgMCwgMTMsIDI0LFxuICAgICAgICA0LCA1LCAxMjEsIDMwLCA0LCAxNCwgNDcsIDI4LCAxMSwgMTQsIDI0LCAzMCwgMTYsIDE0LCAxNSwgMzAsXG4gICAgICAgIDYsIDQsIDExNywgMzAsIDYsIDE0LCA0NSwgMjgsIDExLCAxNiwgMjQsIDMwLCAzMCwgMiwgMTYsIDMwLFxuICAgICAgICA4LCA0LCAxMDYsIDI2LCA4LCAxMywgNDcsIDI4LCA3LCAyMiwgMjQsIDMwLCAyMiwgMTMsIDE1LCAzMCxcbiAgICAgICAgMTAsIDIsIDExNCwgMjgsIDE5LCA0LCA0NiwgMjgsIDI4LCA2LCAyMiwgMjgsIDMzLCA0LCAxNiwgMzAsXG4gICAgICAgIDgsIDQsIDEyMiwgMzAsIDIyLCAzLCA0NSwgMjgsIDgsIDI2LCAyMywgMzAsIDEyLCAyOCwgMTUsIDMwLFxuICAgICAgICAzLCAxMCwgMTE3LCAzMCwgMywgMjMsIDQ1LCAyOCwgNCwgMzEsIDI0LCAzMCwgMTEsIDMxLCAxNSwgMzAsXG4gICAgICAgIDcsIDcsIDExNiwgMzAsIDIxLCA3LCA0NSwgMjgsIDEsIDM3LCAyMywgMzAsIDE5LCAyNiwgMTUsIDMwLFxuICAgICAgICA1LCAxMCwgMTE1LCAzMCwgMTksIDEwLCA0NywgMjgsIDE1LCAyNSwgMjQsIDMwLCAyMywgMjUsIDE1LCAzMCxcbiAgICAgICAgMTMsIDMsIDExNSwgMzAsIDIsIDI5LCA0NiwgMjgsIDQyLCAxLCAyNCwgMzAsIDIzLCAyOCwgMTUsIDMwLFxuICAgICAgICAxNywgMCwgMTE1LCAzMCwgMTAsIDIzLCA0NiwgMjgsIDEwLCAzNSwgMjQsIDMwLCAxOSwgMzUsIDE1LCAzMCxcbiAgICAgICAgMTcsIDEsIDExNSwgMzAsIDE0LCAyMSwgNDYsIDI4LCAyOSwgMTksIDI0LCAzMCwgMTEsIDQ2LCAxNSwgMzAsXG4gICAgICAgIDEzLCA2LCAxMTUsIDMwLCAxNCwgMjMsIDQ2LCAyOCwgNDQsIDcsIDI0LCAzMCwgNTksIDEsIDE2LCAzMCxcbiAgICAgICAgMTIsIDcsIDEyMSwgMzAsIDEyLCAyNiwgNDcsIDI4LCAzOSwgMTQsIDI0LCAzMCwgMjIsIDQxLCAxNSwgMzAsXG4gICAgICAgIDYsIDE0LCAxMjEsIDMwLCA2LCAzNCwgNDcsIDI4LCA0NiwgMTAsIDI0LCAzMCwgMiwgNjQsIDE1LCAzMCxcbiAgICAgICAgMTcsIDQsIDEyMiwgMzAsIDI5LCAxNCwgNDYsIDI4LCA0OSwgMTAsIDI0LCAzMCwgMjQsIDQ2LCAxNSwgMzAsXG4gICAgICAgIDQsIDE4LCAxMjIsIDMwLCAxMywgMzIsIDQ2LCAyOCwgNDgsIDE0LCAyNCwgMzAsIDQyLCAzMiwgMTUsIDMwLFxuICAgICAgICAyMCwgNCwgMTE3LCAzMCwgNDAsIDcsIDQ3LCAyOCwgNDMsIDIyLCAyNCwgMzAsIDEwLCA2NywgMTUsIDMwLFxuICAgICAgICAxOSwgNiwgMTE4LCAzMCwgMTgsIDMxLCA0NywgMjgsIDM0LCAzNCwgMjQsIDMwLCAyMCwgNjEsIDE1LCAzMFxuICAgIF07XG5cbiAgICAvLyBHYWxvaXMgZmllbGQgbG9nIHRhYmxlXG4gICAgdmFyIGdsb2cgPSBbXG4gICAgICAgIDB4ZmYsIDB4MDAsIDB4MDEsIDB4MTksIDB4MDIsIDB4MzIsIDB4MWEsIDB4YzYsIDB4MDMsIDB4ZGYsIDB4MzMsIDB4ZWUsIDB4MWIsIDB4NjgsIDB4YzcsIDB4NGIsXG4gICAgICAgIDB4MDQsIDB4NjQsIDB4ZTAsIDB4MGUsIDB4MzQsIDB4OGQsIDB4ZWYsIDB4ODEsIDB4MWMsIDB4YzEsIDB4NjksIDB4ZjgsIDB4YzgsIDB4MDgsIDB4NGMsIDB4NzEsXG4gICAgICAgIDB4MDUsIDB4OGEsIDB4NjUsIDB4MmYsIDB4ZTEsIDB4MjQsIDB4MGYsIDB4MjEsIDB4MzUsIDB4OTMsIDB4OGUsIDB4ZGEsIDB4ZjAsIDB4MTIsIDB4ODIsIDB4NDUsXG4gICAgICAgIDB4MWQsIDB4YjUsIDB4YzIsIDB4N2QsIDB4NmEsIDB4MjcsIDB4ZjksIDB4YjksIDB4YzksIDB4OWEsIDB4MDksIDB4NzgsIDB4NGQsIDB4ZTQsIDB4NzIsIDB4YTYsXG4gICAgICAgIDB4MDYsIDB4YmYsIDB4OGIsIDB4NjIsIDB4NjYsIDB4ZGQsIDB4MzAsIDB4ZmQsIDB4ZTIsIDB4OTgsIDB4MjUsIDB4YjMsIDB4MTAsIDB4OTEsIDB4MjIsIDB4ODgsXG4gICAgICAgIDB4MzYsIDB4ZDAsIDB4OTQsIDB4Y2UsIDB4OGYsIDB4OTYsIDB4ZGIsIDB4YmQsIDB4ZjEsIDB4ZDIsIDB4MTMsIDB4NWMsIDB4ODMsIDB4MzgsIDB4NDYsIDB4NDAsXG4gICAgICAgIDB4MWUsIDB4NDIsIDB4YjYsIDB4YTMsIDB4YzMsIDB4NDgsIDB4N2UsIDB4NmUsIDB4NmIsIDB4M2EsIDB4MjgsIDB4NTQsIDB4ZmEsIDB4ODUsIDB4YmEsIDB4M2QsXG4gICAgICAgIDB4Y2EsIDB4NWUsIDB4OWIsIDB4OWYsIDB4MGEsIDB4MTUsIDB4NzksIDB4MmIsIDB4NGUsIDB4ZDQsIDB4ZTUsIDB4YWMsIDB4NzMsIDB4ZjMsIDB4YTcsIDB4NTcsXG4gICAgICAgIDB4MDcsIDB4NzAsIDB4YzAsIDB4ZjcsIDB4OGMsIDB4ODAsIDB4NjMsIDB4MGQsIDB4NjcsIDB4NGEsIDB4ZGUsIDB4ZWQsIDB4MzEsIDB4YzUsIDB4ZmUsIDB4MTgsXG4gICAgICAgIDB4ZTMsIDB4YTUsIDB4OTksIDB4NzcsIDB4MjYsIDB4YjgsIDB4YjQsIDB4N2MsIDB4MTEsIDB4NDQsIDB4OTIsIDB4ZDksIDB4MjMsIDB4MjAsIDB4ODksIDB4MmUsXG4gICAgICAgIDB4MzcsIDB4M2YsIDB4ZDEsIDB4NWIsIDB4OTUsIDB4YmMsIDB4Y2YsIDB4Y2QsIDB4OTAsIDB4ODcsIDB4OTcsIDB4YjIsIDB4ZGMsIDB4ZmMsIDB4YmUsIDB4NjEsXG4gICAgICAgIDB4ZjIsIDB4NTYsIDB4ZDMsIDB4YWIsIDB4MTQsIDB4MmEsIDB4NWQsIDB4OWUsIDB4ODQsIDB4M2MsIDB4MzksIDB4NTMsIDB4NDcsIDB4NmQsIDB4NDEsIDB4YTIsXG4gICAgICAgIDB4MWYsIDB4MmQsIDB4NDMsIDB4ZDgsIDB4YjcsIDB4N2IsIDB4YTQsIDB4NzYsIDB4YzQsIDB4MTcsIDB4NDksIDB4ZWMsIDB4N2YsIDB4MGMsIDB4NmYsIDB4ZjYsXG4gICAgICAgIDB4NmMsIDB4YTEsIDB4M2IsIDB4NTIsIDB4MjksIDB4OWQsIDB4NTUsIDB4YWEsIDB4ZmIsIDB4NjAsIDB4ODYsIDB4YjEsIDB4YmIsIDB4Y2MsIDB4M2UsIDB4NWEsXG4gICAgICAgIDB4Y2IsIDB4NTksIDB4NWYsIDB4YjAsIDB4OWMsIDB4YTksIDB4YTAsIDB4NTEsIDB4MGIsIDB4ZjUsIDB4MTYsIDB4ZWIsIDB4N2EsIDB4NzUsIDB4MmMsIDB4ZDcsXG4gICAgICAgIDB4NGYsIDB4YWUsIDB4ZDUsIDB4ZTksIDB4ZTYsIDB4ZTcsIDB4YWQsIDB4ZTgsIDB4NzQsIDB4ZDYsIDB4ZjQsIDB4ZWEsIDB4YTgsIDB4NTAsIDB4NTgsIDB4YWZcbiAgICBdO1xuXG4gICAgLy8gR2FsaW9zIGZpZWxkIGV4cG9uZW50IHRhYmxlXG4gICAgdmFyIGdleHAgPSBbXG4gICAgICAgIDB4MDEsIDB4MDIsIDB4MDQsIDB4MDgsIDB4MTAsIDB4MjAsIDB4NDAsIDB4ODAsIDB4MWQsIDB4M2EsIDB4NzQsIDB4ZTgsIDB4Y2QsIDB4ODcsIDB4MTMsIDB4MjYsXG4gICAgICAgIDB4NGMsIDB4OTgsIDB4MmQsIDB4NWEsIDB4YjQsIDB4NzUsIDB4ZWEsIDB4YzksIDB4OGYsIDB4MDMsIDB4MDYsIDB4MGMsIDB4MTgsIDB4MzAsIDB4NjAsIDB4YzAsXG4gICAgICAgIDB4OWQsIDB4MjcsIDB4NGUsIDB4OWMsIDB4MjUsIDB4NGEsIDB4OTQsIDB4MzUsIDB4NmEsIDB4ZDQsIDB4YjUsIDB4NzcsIDB4ZWUsIDB4YzEsIDB4OWYsIDB4MjMsXG4gICAgICAgIDB4NDYsIDB4OGMsIDB4MDUsIDB4MGEsIDB4MTQsIDB4MjgsIDB4NTAsIDB4YTAsIDB4NWQsIDB4YmEsIDB4NjksIDB4ZDIsIDB4YjksIDB4NmYsIDB4ZGUsIDB4YTEsXG4gICAgICAgIDB4NWYsIDB4YmUsIDB4NjEsIDB4YzIsIDB4OTksIDB4MmYsIDB4NWUsIDB4YmMsIDB4NjUsIDB4Y2EsIDB4ODksIDB4MGYsIDB4MWUsIDB4M2MsIDB4NzgsIDB4ZjAsXG4gICAgICAgIDB4ZmQsIDB4ZTcsIDB4ZDMsIDB4YmIsIDB4NmIsIDB4ZDYsIDB4YjEsIDB4N2YsIDB4ZmUsIDB4ZTEsIDB4ZGYsIDB4YTMsIDB4NWIsIDB4YjYsIDB4NzEsIDB4ZTIsXG4gICAgICAgIDB4ZDksIDB4YWYsIDB4NDMsIDB4ODYsIDB4MTEsIDB4MjIsIDB4NDQsIDB4ODgsIDB4MGQsIDB4MWEsIDB4MzQsIDB4NjgsIDB4ZDAsIDB4YmQsIDB4NjcsIDB4Y2UsXG4gICAgICAgIDB4ODEsIDB4MWYsIDB4M2UsIDB4N2MsIDB4ZjgsIDB4ZWQsIDB4YzcsIDB4OTMsIDB4M2IsIDB4NzYsIDB4ZWMsIDB4YzUsIDB4OTcsIDB4MzMsIDB4NjYsIDB4Y2MsXG4gICAgICAgIDB4ODUsIDB4MTcsIDB4MmUsIDB4NWMsIDB4YjgsIDB4NmQsIDB4ZGEsIDB4YTksIDB4NGYsIDB4OWUsIDB4MjEsIDB4NDIsIDB4ODQsIDB4MTUsIDB4MmEsIDB4NTQsXG4gICAgICAgIDB4YTgsIDB4NGQsIDB4OWEsIDB4MjksIDB4NTIsIDB4YTQsIDB4NTUsIDB4YWEsIDB4NDksIDB4OTIsIDB4MzksIDB4NzIsIDB4ZTQsIDB4ZDUsIDB4YjcsIDB4NzMsXG4gICAgICAgIDB4ZTYsIDB4ZDEsIDB4YmYsIDB4NjMsIDB4YzYsIDB4OTEsIDB4M2YsIDB4N2UsIDB4ZmMsIDB4ZTUsIDB4ZDcsIDB4YjMsIDB4N2IsIDB4ZjYsIDB4ZjEsIDB4ZmYsXG4gICAgICAgIDB4ZTMsIDB4ZGIsIDB4YWIsIDB4NGIsIDB4OTYsIDB4MzEsIDB4NjIsIDB4YzQsIDB4OTUsIDB4MzcsIDB4NmUsIDB4ZGMsIDB4YTUsIDB4NTcsIDB4YWUsIDB4NDEsXG4gICAgICAgIDB4ODIsIDB4MTksIDB4MzIsIDB4NjQsIDB4YzgsIDB4OGQsIDB4MDcsIDB4MGUsIDB4MWMsIDB4MzgsIDB4NzAsIDB4ZTAsIDB4ZGQsIDB4YTcsIDB4NTMsIDB4YTYsXG4gICAgICAgIDB4NTEsIDB4YTIsIDB4NTksIDB4YjIsIDB4NzksIDB4ZjIsIDB4ZjksIDB4ZWYsIDB4YzMsIDB4OWIsIDB4MmIsIDB4NTYsIDB4YWMsIDB4NDUsIDB4OGEsIDB4MDksXG4gICAgICAgIDB4MTIsIDB4MjQsIDB4NDgsIDB4OTAsIDB4M2QsIDB4N2EsIDB4ZjQsIDB4ZjUsIDB4ZjcsIDB4ZjMsIDB4ZmIsIDB4ZWIsIDB4Y2IsIDB4OGIsIDB4MGIsIDB4MTYsXG4gICAgICAgIDB4MmMsIDB4NTgsIDB4YjAsIDB4N2QsIDB4ZmEsIDB4ZTksIDB4Y2YsIDB4ODMsIDB4MWIsIDB4MzYsIDB4NmMsIDB4ZDgsIDB4YWQsIDB4NDcsIDB4OGUsIDB4MDBcbiAgICBdO1xuXG4gICAgLy8gV29ya2luZyBidWZmZXJzOlxuICAgIC8vIGRhdGEgaW5wdXQgYW5kIGVjYyBhcHBlbmQsIGltYWdlIHdvcmtpbmcgYnVmZmVyLCBmaXhlZCBwYXJ0IG9mIGltYWdlLCBydW4gbGVuZ3RocyBmb3IgYmFkbmVzc1xuICAgIHZhciBzdHJpbmJ1Zj1bXSwgZWNjYnVmPVtdLCBxcmZyYW1lPVtdLCBmcmFtYXNrPVtdLCBybGVucz1bXTsgXG4gICAgLy8gQ29udHJvbCB2YWx1ZXMgLSB3aWR0aCBpcyBiYXNlZCBvbiB2ZXJzaW9uLCBsYXN0IDQgYXJlIGZyb20gdGFibGUuXG4gICAgdmFyIHZlcnNpb24sIHdpZHRoLCBuZWNjYmxrMSwgbmVjY2JsazIsIGRhdGFibGt3LCBlY2NibGt3aWQ7XG4gICAgdmFyIGVjY2xldmVsID0gMjtcbiAgICAvLyBzZXQgYml0IHRvIGluZGljYXRlIGNlbGwgaW4gcXJmcmFtZSBpcyBpbW11dGFibGUuICBzeW1tZXRyaWMgYXJvdW5kIGRpYWdvbmFsXG4gICAgZnVuY3Rpb24gc2V0bWFzayh4LCB5KVxuICAgIHtcbiAgICAgICAgdmFyIGJ0O1xuICAgICAgICBpZiAoeCA+IHkpIHtcbiAgICAgICAgICAgIGJ0ID0geDtcbiAgICAgICAgICAgIHggPSB5O1xuICAgICAgICAgICAgeSA9IGJ0O1xuICAgICAgICB9XG4gICAgICAgIC8vIHkqeSA9IDErMys1Li4uXG4gICAgICAgIGJ0ID0geTtcbiAgICAgICAgYnQgKj0geTtcbiAgICAgICAgYnQgKz0geTtcbiAgICAgICAgYnQgPj49IDE7XG4gICAgICAgIGJ0ICs9IHg7XG4gICAgICAgIGZyYW1hc2tbYnRdID0gMTtcbiAgICB9XG5cbiAgICAvLyBlbnRlciBhbGlnbm1lbnQgcGF0dGVybiAtIGJsYWNrIHRvIHFyZnJhbWUsIHdoaXRlIHRvIG1hc2sgKGxhdGVyIGJsYWNrIGZyYW1lIG1lcmdlZCB0byBtYXNrKVxuICAgIGZ1bmN0aW9uIHB1dGFsaWduKHgsIHkpXG4gICAge1xuICAgICAgICB2YXIgajtcblxuICAgICAgICBxcmZyYW1lW3ggKyB3aWR0aCAqIHldID0gMTtcbiAgICAgICAgZm9yIChqID0gLTI7IGogPCAyOyBqKyspIHtcbiAgICAgICAgICAgIHFyZnJhbWVbKHggKyBqKSArIHdpZHRoICogKHkgLSAyKV0gPSAxO1xuICAgICAgICAgICAgcXJmcmFtZVsoeCAtIDIpICsgd2lkdGggKiAoeSArIGogKyAxKV0gPSAxO1xuICAgICAgICAgICAgcXJmcmFtZVsoeCArIDIpICsgd2lkdGggKiAoeSArIGopXSA9IDE7XG4gICAgICAgICAgICBxcmZyYW1lWyh4ICsgaiArIDEpICsgd2lkdGggKiAoeSArIDIpXSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChqID0gMDsgaiA8IDI7IGorKykge1xuICAgICAgICAgICAgc2V0bWFzayh4IC0gMSwgeSArIGopO1xuICAgICAgICAgICAgc2V0bWFzayh4ICsgMSwgeSAtIGopO1xuICAgICAgICAgICAgc2V0bWFzayh4IC0gaiwgeSAtIDEpO1xuICAgICAgICAgICAgc2V0bWFzayh4ICsgaiwgeSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBSZWVkIFNvbG9tb24gZXJyb3IgY29ycmVjdGlvblxuICAgIC8vIGV4cG9uZW50aWF0aW9uIG1vZCBOXG4gICAgZnVuY3Rpb24gbW9kbm4oeClcbiAgICB7XG4gICAgICAgIHdoaWxlICh4ID49IDI1NSkge1xuICAgICAgICAgICAgeCAtPSAyNTU7XG4gICAgICAgICAgICB4ID0gKHggPj4gOCkgKyAoeCAmIDI1NSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuXG4gICAgdmFyIGdlbnBvbHkgPSBbXTtcblxuICAgIC8vIENhbGN1bGF0ZSBhbmQgYXBwZW5kIEVDQyBkYXRhIHRvIGRhdGEgYmxvY2suICBCbG9jayBpcyBpbiBzdHJpbmJ1ZiwgaW5kZXhlcyB0byBidWZmZXJzIGdpdmVuLlxuICAgIGZ1bmN0aW9uIGFwcGVuZHJzKGRhdGEsIGRsZW4sIGVjYnVmLCBlY2xlbilcbiAgICB7XG4gICAgICAgIHZhciBpLCBqLCBmYjtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZWNsZW47IGkrKylcbiAgICAgICAgICAgIHN0cmluYnVmW2VjYnVmICsgaV0gPSAwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBmYiA9IGdsb2dbc3RyaW5idWZbZGF0YSArIGldIF4gc3RyaW5idWZbZWNidWZdXTtcbiAgICAgICAgICAgIGlmIChmYiAhPSAyNTUpICAgICAvKiBmYiB0ZXJtIGlzIG5vbi16ZXJvICovXG4gICAgICAgICAgICAgICAgZm9yIChqID0gMTsgaiA8IGVjbGVuOyBqKyspXG4gICAgICAgICAgICAgICAgICAgIHN0cmluYnVmW2VjYnVmICsgaiAtIDFdID0gc3RyaW5idWZbZWNidWYgKyBqXSBeIGdleHBbbW9kbm4oZmIgKyBnZW5wb2x5W2VjbGVuIC0gal0pXTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBmb3IoIGogPSBlY2J1ZiA7IGogPCBlY2J1ZiArIGVjbGVuOyBqKysgKVxuICAgICAgICAgICAgICAgICAgICBzdHJpbmJ1ZltqXSA9IHN0cmluYnVmW2ogKyAxXTtcbiAgICAgICAgICAgIHN0cmluYnVmWyBlY2J1ZiArIGVjbGVuIC0gMV0gPSBmYiA9PSAyNTUgPyAwIDogZ2V4cFttb2RubihmYiArIGdlbnBvbHlbMF0pXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gRnJhbWUgZGF0YSBpbnNlcnQgZm9sbG93aW5nIHRoZSBwYXRoIHJ1bGVzXG5cbiAgICAvLyBjaGVjayBtYXNrIC0gc2luY2Ugc3ltbWV0cmljYWwgdXNlIGhhbGYuXG4gICAgZnVuY3Rpb24gaXNtYXNrZWQoeCwgeSlcbiAgICB7XG4gICAgICAgIHZhciBidDtcbiAgICAgICAgaWYgKHggPiB5KSB7XG4gICAgICAgICAgICBidCA9IHg7XG4gICAgICAgICAgICB4ID0geTtcbiAgICAgICAgICAgIHkgPSBidDtcbiAgICAgICAgfVxuICAgICAgICBidCA9IHk7XG4gICAgICAgIGJ0ICs9IHkgKiB5O1xuICAgICAgICBidCA+Pj0gMTtcbiAgICAgICAgYnQgKz0geDtcbiAgICAgICAgcmV0dXJuIGZyYW1hc2tbYnRdO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gIEFwcGx5IHRoZSBzZWxlY3RlZCBtYXNrIG91dCBvZiB0aGUgOC5cbiAgICBmdW5jdGlvbiAgYXBwbHltYXNrKG0pXG4gICAge1xuICAgICAgICB2YXIgeCwgeSwgcjN4LCByM3k7XG5cbiAgICAgICAgc3dpdGNoIChtKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aDsgeSsrKVxuICAgICAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCB3aWR0aDsgeCsrKVxuICAgICAgICAgICAgICAgICAgICBpZiAoISgoeCArIHkpICYgMSkgJiYgIWlzbWFza2VkKHgsIHkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aDsgeSsrKVxuICAgICAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCB3aWR0aDsgeCsrKVxuICAgICAgICAgICAgICAgICAgICBpZiAoISh5ICYgMSkgJiYgIWlzbWFza2VkKHgsIHkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aDsgeSsrKVxuICAgICAgICAgICAgICAgIGZvciAocjN4ID0gMCwgeCA9IDA7IHggPCB3aWR0aDsgeCsrLCByM3grKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocjN4ID09IDMpXG4gICAgICAgICAgICAgICAgICAgICAgICByM3ggPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXIzeCAmJiAhaXNtYXNrZWQoeCwgeSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGZvciAocjN5ID0gMCwgeSA9IDA7IHkgPCB3aWR0aDsgeSsrLCByM3krKykge1xuICAgICAgICAgICAgICAgIGlmIChyM3kgPT0gMylcbiAgICAgICAgICAgICAgICAgICAgcjN5ID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKHIzeCA9IHIzeSwgeCA9IDA7IHggPCB3aWR0aDsgeCsrLCByM3grKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocjN4ID09IDMpXG4gICAgICAgICAgICAgICAgICAgICAgICByM3ggPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXIzeCAmJiAhaXNtYXNrZWQoeCwgeSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIGZvciAoeSA9IDA7IHkgPCB3aWR0aDsgeSsrKVxuICAgICAgICAgICAgICAgIGZvciAocjN4ID0gMCwgcjN5ID0gKCh5ID4+IDEpICYgMSksIHggPSAwOyB4IDwgd2lkdGg7IHgrKywgcjN4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIzeCA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByM3ggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcjN5ID0gIXIzeTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXIzeSAmJiAhaXNtYXNrZWQoeCwgeSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgIGZvciAocjN5ID0gMCwgeSA9IDA7IHkgPCB3aWR0aDsgeSsrLCByM3krKykge1xuICAgICAgICAgICAgICAgIGlmIChyM3kgPT0gMylcbiAgICAgICAgICAgICAgICAgICAgcjN5ID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKHIzeCA9IDAsIHggPSAwOyB4IDwgd2lkdGg7IHgrKywgcjN4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIzeCA9PSAzKVxuICAgICAgICAgICAgICAgICAgICAgICAgcjN4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoKHggJiB5ICYgMSkgKyAhKCFyM3ggfCAhcjN5KSkgJiYgIWlzbWFza2VkKHgsIHkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICBmb3IgKHIzeSA9IDAsIHkgPSAwOyB5IDwgd2lkdGg7IHkrKywgcjN5KyspIHtcbiAgICAgICAgICAgICAgICBpZiAocjN5ID09IDMpXG4gICAgICAgICAgICAgICAgICAgIHIzeSA9IDA7XG4gICAgICAgICAgICAgICAgZm9yIChyM3ggPSAwLCB4ID0gMDsgeCA8IHdpZHRoOyB4KyssIHIzeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyM3ggPT0gMylcbiAgICAgICAgICAgICAgICAgICAgICAgIHIzeCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKCgoeCAmIHkgJiAxKSArIChyM3ggJiYgKHIzeCA9PSByM3kpKSkgJiAxKSAmJiAhaXNtYXNrZWQoeCwgeSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBxcmZyYW1lW3ggKyB5ICogd2lkdGhdIF49IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgIGZvciAocjN5ID0gMCwgeSA9IDA7IHkgPCB3aWR0aDsgeSsrLCByM3krKykge1xuICAgICAgICAgICAgICAgIGlmIChyM3kgPT0gMylcbiAgICAgICAgICAgICAgICAgICAgcjN5ID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKHIzeCA9IDAsIHggPSAwOyB4IDwgd2lkdGg7IHgrKywgcjN4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIzeCA9PSAzKVxuICAgICAgICAgICAgICAgICAgICAgICAgcjN4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoKChyM3ggJiYgKHIzeCA9PSByM3kpKSArICgoeCArIHkpICYgMSkpICYgMSkgJiYgIWlzbWFza2VkKHgsIHkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcXJmcmFtZVt4ICsgeSAqIHdpZHRoXSBePSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBCYWRuZXNzIGNvZWZmaWNpZW50cy5cbiAgICB2YXIgTjEgPSAzLCBOMiA9IDMsIE4zID0gNDAsIE40ID0gMTA7XG5cbiAgICAvLyBVc2luZyB0aGUgdGFibGUgb2YgdGhlIGxlbmd0aCBvZiBlYWNoIHJ1biwgY2FsY3VsYXRlIHRoZSBhbW91bnQgb2YgYmFkIGltYWdlIFxuICAgIC8vIC0gbG9uZyBydW5zIG9yIHRob3NlIHRoYXQgbG9vayBsaWtlIGZpbmRlcnM7IGNhbGxlZCB0d2ljZSwgb25jZSBlYWNoIGZvciBYIGFuZCBZXG4gICAgZnVuY3Rpb24gYmFkcnVucyhsZW5ndGgpXG4gICAge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIHJ1bnNiYWQgPSAwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDw9IGxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgaWYgKHJsZW5zW2ldID49IDUpXG4gICAgICAgICAgICAgICAgcnVuc2JhZCArPSBOMSArIHJsZW5zW2ldIC0gNTtcbiAgICAgICAgLy8gQndCQkJ3QiBhcyBpbiBmaW5kZXJcbiAgICAgICAgZm9yIChpID0gMzsgaSA8IGxlbmd0aCAtIDE7IGkgKz0gMilcbiAgICAgICAgICAgIGlmIChybGVuc1tpIC0gMl0gPT0gcmxlbnNbaSArIDJdXG4gICAgICAgICAgICAgICAgJiYgcmxlbnNbaSArIDJdID09IHJsZW5zW2kgLSAxXVxuICAgICAgICAgICAgICAgICYmIHJsZW5zW2kgLSAxXSA9PSBybGVuc1tpICsgMV1cbiAgICAgICAgICAgICAgICAmJiBybGVuc1tpIC0gMV0gKiAzID09IHJsZW5zW2ldXG4gICAgICAgICAgICAgICAgLy8gd2hpdGUgYXJvdW5kIHRoZSBibGFjayBwYXR0ZXJuPyBOb3QgcGFydCBvZiBzcGVjXG4gICAgICAgICAgICAgICAgJiYgKHJsZW5zW2kgLSAzXSA9PSAwIC8vIGJlZ2lubmluZ1xuICAgICAgICAgICAgICAgICAgICB8fCBpICsgMyA+IGxlbmd0aCAgLy8gZW5kXG4gICAgICAgICAgICAgICAgICAgIHx8IHJsZW5zW2kgLSAzXSAqIDMgPj0gcmxlbnNbaV0gKiA0IHx8IHJsZW5zW2kgKyAzXSAqIDMgPj0gcmxlbnNbaV0gKiA0KVxuICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJ1bnNiYWQgKz0gTjM7XG4gICAgICAgIHJldHVybiBydW5zYmFkO1xuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSBob3cgYmFkIHRoZSBtYXNrZWQgaW1hZ2UgaXMgLSBibG9ja3MsIGltYmFsYW5jZSwgcnVucywgb3IgZmluZGVycy5cbiAgICBmdW5jdGlvbiBiYWRjaGVjaygpXG4gICAge1xuICAgICAgICB2YXIgeCwgeSwgaCwgYiwgYjE7XG4gICAgICAgIHZhciB0aGlzYmFkID0gMDtcbiAgICAgICAgdmFyIGJ3ID0gMDtcblxuICAgICAgICAvLyBibG9ja3Mgb2Ygc2FtZSBjb2xvci5cbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoIC0gMTsgeSsrKVxuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHdpZHRoIC0gMTsgeCsrKVxuICAgICAgICAgICAgICAgIGlmICgocXJmcmFtZVt4ICsgd2lkdGggKiB5XSAmJiBxcmZyYW1lWyh4ICsgMSkgKyB3aWR0aCAqIHldXG4gICAgICAgICAgICAgICAgICAgICAmJiBxcmZyYW1lW3ggKyB3aWR0aCAqICh5ICsgMSldICYmIHFyZnJhbWVbKHggKyAxKSArIHdpZHRoICogKHkgKyAxKV0pIC8vIGFsbCBibGFja1xuICAgICAgICAgICAgICAgICAgICB8fCAhKHFyZnJhbWVbeCArIHdpZHRoICogeV0gfHwgcXJmcmFtZVsoeCArIDEpICsgd2lkdGggKiB5XVxuICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHFyZnJhbWVbeCArIHdpZHRoICogKHkgKyAxKV0gfHwgcXJmcmFtZVsoeCArIDEpICsgd2lkdGggKiAoeSArIDEpXSkpIC8vIGFsbCB3aGl0ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzYmFkICs9IE4yO1xuXG4gICAgICAgIC8vIFggcnVuc1xuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgd2lkdGg7IHkrKykge1xuICAgICAgICAgICAgcmxlbnNbMF0gPSAwO1xuICAgICAgICAgICAgZm9yIChoID0gYiA9IHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGlmICgoYjEgPSBxcmZyYW1lW3ggKyB3aWR0aCAqIHldKSA9PSBiKVxuICAgICAgICAgICAgICAgICAgICBybGVuc1toXSsrO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmxlbnNbKytoXSA9IDE7XG4gICAgICAgICAgICAgICAgYiA9IGIxO1xuICAgICAgICAgICAgICAgIGJ3ICs9IGIgPyAxIDogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzYmFkICs9IGJhZHJ1bnMoaCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBibGFjay93aGl0ZSBpbWJhbGFuY2VcbiAgICAgICAgaWYgKGJ3IDwgMClcbiAgICAgICAgICAgIGJ3ID0gLWJ3O1xuXG4gICAgICAgIHZhciBiaWcgPSBidztcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgYmlnICs9IGJpZyA8PCAyO1xuICAgICAgICBiaWcgPDw9IDE7XG4gICAgICAgIHdoaWxlIChiaWcgPiB3aWR0aCAqIHdpZHRoKVxuICAgICAgICAgICAgYmlnIC09IHdpZHRoICogd2lkdGgsIGNvdW50Kys7XG4gICAgICAgIHRoaXNiYWQgKz0gY291bnQgKiBONDtcblxuICAgICAgICAvLyBZIHJ1bnNcbiAgICAgICAgZm9yICh4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgICAgICAgIHJsZW5zWzBdID0gMDtcbiAgICAgICAgICAgIGZvciAoaCA9IGIgPSB5ID0gMDsgeSA8IHdpZHRoOyB5KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoKGIxID0gcXJmcmFtZVt4ICsgd2lkdGggKiB5XSkgPT0gYilcbiAgICAgICAgICAgICAgICAgICAgcmxlbnNbaF0rKztcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJsZW5zWysraF0gPSAxO1xuICAgICAgICAgICAgICAgIGIgPSBiMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXNiYWQgKz0gYmFkcnVucyhoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc2JhZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5mcmFtZShpbnN0cmluZylcbiAgICB7XG4gICAgICAgIHZhciB4LCB5LCBrLCB0LCB2LCBpLCBqLCBtO1xuXG4gICAgLy8gZmluZCB0aGUgc21hbGxlc3QgdmVyc2lvbiB0aGF0IGZpdHMgdGhlIHN0cmluZ1xuICAgICAgICB0ID0gaW5zdHJpbmcubGVuZ3RoO1xuICAgICAgICB2ZXJzaW9uID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdmVyc2lvbisrO1xuICAgICAgICAgICAgayA9IChlY2NsZXZlbCAtIDEpICogNCArICh2ZXJzaW9uIC0gMSkgKiAxNjtcbiAgICAgICAgICAgIG5lY2NibGsxID0gZWNjYmxvY2tzW2srK107XG4gICAgICAgICAgICBuZWNjYmxrMiA9IGVjY2Jsb2Nrc1trKytdO1xuICAgICAgICAgICAgZGF0YWJsa3cgPSBlY2NibG9ja3NbaysrXTtcbiAgICAgICAgICAgIGVjY2Jsa3dpZCA9IGVjY2Jsb2Nrc1trXTtcbiAgICAgICAgICAgIGsgPSBkYXRhYmxrdyAqIChuZWNjYmxrMSArIG5lY2NibGsyKSArIG5lY2NibGsyIC0gMyArICh2ZXJzaW9uIDw9IDkpO1xuICAgICAgICAgICAgaWYgKHQgPD0gaylcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfSB3aGlsZSAodmVyc2lvbiA8IDQwKTtcblxuICAgIC8vIEZJWE1FIC0gaW5zdXJlIHRoYXQgaXQgZml0cyBpbnN0ZWQgb2YgYmVpbmcgdHJ1bmNhdGVkXG4gICAgICAgIHdpZHRoID0gMTcgKyA0ICogdmVyc2lvbjtcblxuICAgIC8vIGFsbG9jYXRlLCBjbGVhciBhbmQgc2V0dXAgZGF0YSBzdHJ1Y3R1cmVzXG4gICAgICAgIHYgPSBkYXRhYmxrdyArIChkYXRhYmxrdyArIGVjY2Jsa3dpZCkgKiAobmVjY2JsazEgKyBuZWNjYmxrMikgKyBuZWNjYmxrMjtcbiAgICAgICAgZm9yKCB0ID0gMDsgdCA8IHY7IHQrKyApXG4gICAgICAgICAgICBlY2NidWZbdF0gPSAwO1xuICAgICAgICBzdHJpbmJ1ZiA9IGluc3RyaW5nLnNsaWNlKDApO1xuXG4gICAgICAgIGZvciggdCA9IDA7IHQgPCB3aWR0aCAqIHdpZHRoOyB0KysgKVxuICAgICAgICAgICAgcXJmcmFtZVt0XSA9IDA7XG5cbiAgICAgICAgZm9yKCB0ID0gMCA7IHQgPCAod2lkdGggKiAod2lkdGggKyAxKSArIDEpIC8gMjsgdCsrKVxuICAgICAgICAgICAgZnJhbWFza1t0XSA9IDA7XG5cbiAgICAvLyBpbnNlcnQgZmluZGVycyAtIGJsYWNrIHRvIGZyYW1lLCB3aGl0ZSB0byBtYXNrXG4gICAgICAgIGZvciAodCA9IDA7IHQgPCAzOyB0KyspIHtcbiAgICAgICAgICAgIGsgPSAwO1xuICAgICAgICAgICAgeSA9IDA7XG4gICAgICAgICAgICBpZiAodCA9PSAxKVxuICAgICAgICAgICAgICAgIGsgPSAod2lkdGggLSA3KTtcbiAgICAgICAgICAgIGlmICh0ID09IDIpXG4gICAgICAgICAgICAgICAgeSA9ICh3aWR0aCAtIDcpO1xuICAgICAgICAgICAgcXJmcmFtZVsoeSArIDMpICsgd2lkdGggKiAoayArIDMpXSA9IDE7XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgNjsgeCsrKSB7XG4gICAgICAgICAgICAgICAgcXJmcmFtZVsoeSArIHgpICsgd2lkdGggKiBrXSA9IDE7XG4gICAgICAgICAgICAgICAgcXJmcmFtZVt5ICsgd2lkdGggKiAoayArIHggKyAxKV0gPSAxO1xuICAgICAgICAgICAgICAgIHFyZnJhbWVbKHkgKyA2KSArIHdpZHRoICogKGsgKyB4KV0gPSAxO1xuICAgICAgICAgICAgICAgIHFyZnJhbWVbKHkgKyB4ICsgMSkgKyB3aWR0aCAqIChrICsgNildID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoeCA9IDE7IHggPCA1OyB4KyspIHtcbiAgICAgICAgICAgICAgICBzZXRtYXNrKHkgKyB4LCBrICsgMSk7XG4gICAgICAgICAgICAgICAgc2V0bWFzayh5ICsgMSwgayArIHggKyAxKTtcbiAgICAgICAgICAgICAgICBzZXRtYXNrKHkgKyA1LCBrICsgeCk7XG4gICAgICAgICAgICAgICAgc2V0bWFzayh5ICsgeCArIDEsIGsgKyA1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoeCA9IDI7IHggPCA0OyB4KyspIHtcbiAgICAgICAgICAgICAgICBxcmZyYW1lWyh5ICsgeCkgKyB3aWR0aCAqIChrICsgMildID0gMTtcbiAgICAgICAgICAgICAgICBxcmZyYW1lWyh5ICsgMikgKyB3aWR0aCAqIChrICsgeCArIDEpXSA9IDE7XG4gICAgICAgICAgICAgICAgcXJmcmFtZVsoeSArIDQpICsgd2lkdGggKiAoayArIHgpXSA9IDE7XG4gICAgICAgICAgICAgICAgcXJmcmFtZVsoeSArIHggKyAxKSArIHdpZHRoICogKGsgKyA0KV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAvLyBhbGlnbm1lbnQgYmxvY2tzXG4gICAgICAgIGlmICh2ZXJzaW9uID4gMSkge1xuICAgICAgICAgICAgdCA9IGFkZWx0YVt2ZXJzaW9uXTtcbiAgICAgICAgICAgIHkgPSB3aWR0aCAtIDc7XG4gICAgICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgICAgICAgeCA9IHdpZHRoIC0gNztcbiAgICAgICAgICAgICAgICB3aGlsZSAoeCA+IHQgLSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHB1dGFsaWduKHgsIHkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoeCA8IHQpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgeCAtPSB0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoeSA8PSB0ICsgOSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgeSAtPSB0O1xuICAgICAgICAgICAgICAgIHB1dGFsaWduKDYsIHkpO1xuICAgICAgICAgICAgICAgIHB1dGFsaWduKHksIDYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAvLyBzaW5nbGUgYmxhY2tcbiAgICAgICAgcXJmcmFtZVs4ICsgd2lkdGggKiAod2lkdGggLSA4KV0gPSAxO1xuXG4gICAgLy8gdGltaW5nIGdhcCAtIG1hc2sgb25seVxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgNzsgeSsrKSB7XG4gICAgICAgICAgICBzZXRtYXNrKDcsIHkpO1xuICAgICAgICAgICAgc2V0bWFzayh3aWR0aCAtIDgsIHkpO1xuICAgICAgICAgICAgc2V0bWFzayg3LCB5ICsgd2lkdGggLSA3KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHggPSAwOyB4IDwgODsgeCsrKSB7XG4gICAgICAgICAgICBzZXRtYXNrKHgsIDcpO1xuICAgICAgICAgICAgc2V0bWFzayh4ICsgd2lkdGggLSA4LCA3KTtcbiAgICAgICAgICAgIHNldG1hc2soeCwgd2lkdGggLSA4KTtcbiAgICAgICAgfVxuXG4gICAgLy8gcmVzZXJ2ZSBtYXNrLWZvcm1hdCBhcmVhXG4gICAgICAgIGZvciAoeCA9IDA7IHggPCA5OyB4KyspXG4gICAgICAgICAgICBzZXRtYXNrKHgsIDgpO1xuICAgICAgICBmb3IgKHggPSAwOyB4IDwgODsgeCsrKSB7XG4gICAgICAgICAgICBzZXRtYXNrKHggKyB3aWR0aCAtIDgsIDgpO1xuICAgICAgICAgICAgc2V0bWFzayg4LCB4KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgNzsgeSsrKVxuICAgICAgICAgICAgc2V0bWFzayg4LCB5ICsgd2lkdGggLSA3KTtcblxuICAgIC8vIHRpbWluZyByb3cvY29sXG4gICAgICAgIGZvciAoeCA9IDA7IHggPCB3aWR0aCAtIDE0OyB4KyspXG4gICAgICAgICAgICBpZiAoeCAmIDEpIHtcbiAgICAgICAgICAgICAgICBzZXRtYXNrKDggKyB4LCA2KTtcbiAgICAgICAgICAgICAgICBzZXRtYXNrKDYsIDggKyB4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHFyZnJhbWVbKDggKyB4KSArIHdpZHRoICogNl0gPSAxO1xuICAgICAgICAgICAgICAgIHFyZnJhbWVbNiArIHdpZHRoICogKDggKyB4KV0gPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgLy8gdmVyc2lvbiBibG9ja1xuICAgICAgICBpZiAodmVyc2lvbiA+IDYpIHtcbiAgICAgICAgICAgIHQgPSB2cGF0W3ZlcnNpb24gLSA3XTtcbiAgICAgICAgICAgIGsgPSAxNztcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCA2OyB4KyspXG4gICAgICAgICAgICAgICAgZm9yICh5ID0gMDsgeSA8IDM7IHkrKywgay0tKVxuICAgICAgICAgICAgICAgICAgICBpZiAoMSAmIChrID4gMTEgPyB2ZXJzaW9uID4+IChrIC0gMTIpIDogdCA+PiBrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXJmcmFtZVsoNSAtIHgpICsgd2lkdGggKiAoMiAtIHkgKyB3aWR0aCAtIDExKV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXJmcmFtZVsoMiAtIHkgKyB3aWR0aCAtIDExKSArIHdpZHRoICogKDUgLSB4KV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRtYXNrKDUgLSB4LCAyIC0geSArIHdpZHRoIC0gMTEpO1xuICAgICAgICAgICAgICAgIHNldG1hc2soMiAtIHkgKyB3aWR0aCAtIDExLCA1IC0geCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIC8vIHN5bmMgbWFzayBiaXRzIC0gb25seSBzZXQgYWJvdmUgZm9yIHdoaXRlIHNwYWNlcywgc28gYWRkIGluIGJsYWNrIGJpdHNcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IHdpZHRoOyB5KyspXG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDw9IHk7IHgrKylcbiAgICAgICAgICAgICAgICBpZiAocXJmcmFtZVt4ICsgd2lkdGggKiB5XSlcbiAgICAgICAgICAgICAgICAgICAgc2V0bWFzayh4LCB5KTtcblxuICAgIC8vIGNvbnZlcnQgc3RyaW5nIHRvIGJpdHN0cmVhbVxuICAgIC8vIDggYml0IGRhdGEgdG8gUVItY29kZWQgOCBiaXQgZGF0YSAobnVtZXJpYyBvciBhbHBoYW51bSwgb3Iga2Fuamkgbm90IHN1cHBvcnRlZClcbiAgICAgICAgdiA9IHN0cmluYnVmLmxlbmd0aDtcblxuICAgIC8vIHN0cmluZyB0byBhcnJheVxuICAgICAgICBmb3IoIGkgPSAwIDsgaSA8IHY7IGkrKyApXG4gICAgICAgICAgICBlY2NidWZbaV0gPSBzdHJpbmJ1Zi5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBzdHJpbmJ1ZiA9IGVjY2J1Zi5zbGljZSgwKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBtYXggc3RyaW5nIGxlbmd0aFxuICAgICAgICB4ID0gZGF0YWJsa3cgKiAobmVjY2JsazEgKyBuZWNjYmxrMikgKyBuZWNjYmxrMjtcbiAgICAgICAgaWYgKHYgPj0geCAtIDIpIHtcbiAgICAgICAgICAgIHYgPSB4IC0gMjtcbiAgICAgICAgICAgIGlmICh2ZXJzaW9uID4gOSlcbiAgICAgICAgICAgICAgICB2LS07XG4gICAgICAgIH1cblxuICAgIC8vIHNoaWZ0IGFuZCByZXBhY2sgdG8gaW5zZXJ0IGxlbmd0aCBwcmVmaXhcbiAgICAgICAgaSA9IHY7XG4gICAgICAgIGlmICh2ZXJzaW9uID4gOSkge1xuICAgICAgICAgICAgc3RyaW5idWZbaSArIDJdID0gMDtcbiAgICAgICAgICAgIHN0cmluYnVmW2kgKyAzXSA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgdCA9IHN0cmluYnVmW2ldO1xuICAgICAgICAgICAgICAgIHN0cmluYnVmW2kgKyAzXSB8PSAyNTUgJiAodCA8PCA0KTtcbiAgICAgICAgICAgICAgICBzdHJpbmJ1ZltpICsgMl0gPSB0ID4+IDQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHJpbmJ1ZlsyXSB8PSAyNTUgJiAodiA8PCA0KTtcbiAgICAgICAgICAgIHN0cmluYnVmWzFdID0gdiA+PiA0O1xuICAgICAgICAgICAgc3RyaW5idWZbMF0gPSAweDQwIHwgKHYgPj4gMTIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RyaW5idWZbaSArIDFdID0gMDtcbiAgICAgICAgICAgIHN0cmluYnVmW2kgKyAyXSA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgdCA9IHN0cmluYnVmW2ldO1xuICAgICAgICAgICAgICAgIHN0cmluYnVmW2kgKyAyXSB8PSAyNTUgJiAodCA8PCA0KTtcbiAgICAgICAgICAgICAgICBzdHJpbmJ1ZltpICsgMV0gPSB0ID4+IDQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHJpbmJ1ZlsxXSB8PSAyNTUgJiAodiA8PCA0KTtcbiAgICAgICAgICAgIHN0cmluYnVmWzBdID0gMHg0MCB8ICh2ID4+IDQpO1xuICAgICAgICB9XG4gICAgLy8gZmlsbCB0byBlbmQgd2l0aCBwYWQgcGF0dGVyblxuICAgICAgICBpID0gdiArIDMgLSAodmVyc2lvbiA8IDEwKTtcbiAgICAgICAgd2hpbGUgKGkgPCB4KSB7XG4gICAgICAgICAgICBzdHJpbmJ1ZltpKytdID0gMHhlYztcbiAgICAgICAgICAgIC8vIGJ1ZmZlciBoYXMgcm9vbSAgICBpZiAoaSA9PSB4KSAgICAgIGJyZWFrO1xuICAgICAgICAgICAgc3RyaW5idWZbaSsrXSA9IDB4MTE7XG4gICAgICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZSBhbmQgYXBwZW5kIEVDQ1xuXG4gICAgLy8gY2FsY3VsYXRlIGdlbmVyYXRvciBwb2x5bm9taWFsXG4gICAgICAgIGdlbnBvbHlbMF0gPSAxO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZWNjYmxrd2lkOyBpKyspIHtcbiAgICAgICAgICAgIGdlbnBvbHlbaSArIDFdID0gMTtcbiAgICAgICAgICAgIGZvciAoaiA9IGk7IGogPiAwOyBqLS0pXG4gICAgICAgICAgICAgICAgZ2VucG9seVtqXSA9IGdlbnBvbHlbal1cbiAgICAgICAgICAgICAgICA/IGdlbnBvbHlbaiAtIDFdIF4gZ2V4cFttb2RubihnbG9nW2dlbnBvbHlbal1dICsgaSldIDogZ2VucG9seVtqIC0gMV07XG4gICAgICAgICAgICBnZW5wb2x5WzBdID0gZ2V4cFttb2RubihnbG9nW2dlbnBvbHlbMF1dICsgaSldO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPD0gZWNjYmxrd2lkOyBpKyspXG4gICAgICAgICAgICBnZW5wb2x5W2ldID0gZ2xvZ1tnZW5wb2x5W2ldXTsgLy8gdXNlIGxvZ3MgZm9yIGdlbnBvbHlbXSB0byBzYXZlIGNhbGMgc3RlcFxuXG4gICAgLy8gYXBwZW5kIGVjYyB0byBkYXRhIGJ1ZmZlclxuICAgICAgICBrID0geDtcbiAgICAgICAgeSA9IDA7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuZWNjYmxrMTsgaSsrKSB7XG4gICAgICAgICAgICBhcHBlbmRycyh5LCBkYXRhYmxrdywgaywgZWNjYmxrd2lkKTtcbiAgICAgICAgICAgIHkgKz0gZGF0YWJsa3c7XG4gICAgICAgICAgICBrICs9IGVjY2Jsa3dpZDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmVjY2JsazI7IGkrKykge1xuICAgICAgICAgICAgYXBwZW5kcnMoeSwgZGF0YWJsa3cgKyAxLCBrLCBlY2NibGt3aWQpO1xuICAgICAgICAgICAgeSArPSBkYXRhYmxrdyArIDE7XG4gICAgICAgICAgICBrICs9IGVjY2Jsa3dpZDtcbiAgICAgICAgfVxuICAgIC8vIGludGVybGVhdmUgYmxvY2tzXG4gICAgICAgIHkgPSAwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZGF0YWJsa3c7IGkrKykge1xuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IG5lY2NibGsxOyBqKyspXG4gICAgICAgICAgICAgICAgZWNjYnVmW3krK10gPSBzdHJpbmJ1ZltpICsgaiAqIGRhdGFibGt3XTtcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBuZWNjYmxrMjsgaisrKVxuICAgICAgICAgICAgICAgIGVjY2J1Zlt5KytdID0gc3RyaW5idWZbKG5lY2NibGsxICogZGF0YWJsa3cpICsgaSArIChqICogKGRhdGFibGt3ICsgMSkpXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGogPSAwOyBqIDwgbmVjY2JsazI7IGorKylcbiAgICAgICAgICAgIGVjY2J1Zlt5KytdID0gc3RyaW5idWZbKG5lY2NibGsxICogZGF0YWJsa3cpICsgaSArIChqICogKGRhdGFibGt3ICsgMSkpXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGVjY2Jsa3dpZDsgaSsrKVxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IG5lY2NibGsxICsgbmVjY2JsazI7IGorKylcbiAgICAgICAgICAgICAgICBlY2NidWZbeSsrXSA9IHN0cmluYnVmW3ggKyBpICsgaiAqIGVjY2Jsa3dpZF07XG4gICAgICAgIHN0cmluYnVmID0gZWNjYnVmO1xuXG4gICAgLy8gcGFjayBiaXRzIGludG8gZnJhbWUgYXZvaWRpbmcgbWFza2VkIGFyZWEuXG4gICAgICAgIHggPSB5ID0gd2lkdGggLSAxO1xuICAgICAgICBrID0gdiA9IDE7ICAgICAgICAgLy8gdXAsIG1pbnVzXG4gICAgICAgIC8qIGludGVsZWF2ZWQgZGF0YSBhbmQgZWNjIGNvZGVzICovXG4gICAgICAgIG0gPSAoZGF0YWJsa3cgKyBlY2NibGt3aWQpICogKG5lY2NibGsxICsgbmVjY2JsazIpICsgbmVjY2JsazI7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgIHQgPSBzdHJpbmJ1ZltpXTtcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCA4OyBqKyssIHQgPDw9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoMHg4MCAmIHQpXG4gICAgICAgICAgICAgICAgICAgIHFyZnJhbWVbeCArIHdpZHRoICogeV0gPSAxO1xuICAgICAgICAgICAgICAgIGRvIHsgICAgICAgIC8vIGZpbmQgbmV4dCBmaWxsIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmICh2KVxuICAgICAgICAgICAgICAgICAgICAgICAgeC0tO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgIT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4IC09IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSAhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHggPT0gNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeSA9IDk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSAhPSB3aWR0aCAtIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeCAtPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gIWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4ID09IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkgLT0gODtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2ID0gIXY7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoaXNtYXNrZWQoeCwgeSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAvLyBzYXZlIHByZS1tYXNrIGNvcHkgb2YgZnJhbWVcbiAgICAgICAgc3RyaW5idWYgPSBxcmZyYW1lLnNsaWNlKDApO1xuICAgICAgICB0ID0gMDsgICAgICAgICAgIC8vIGJlc3RcbiAgICAgICAgeSA9IDMwMDAwOyAgICAgICAgIC8vIGRlbWVyaXRcbiAgICAvLyBmb3IgaW5zdGVhZCBvZiB3aGlsZSBzaW5jZSBpbiBvcmlnaW5hbCBhcmR1aW5vIGNvZGVcbiAgICAvLyBpZiBhbiBlYXJseSBtYXNrIHdhcyBcImdvb2QgZW5vdWdoXCIgaXQgd291bGRuJ3QgdHJ5IGZvciBhIGJldHRlciBvbmVcbiAgICAvLyBzaW5jZSB0aGV5IGdldCBtb3JlIGNvbXBsZXggYW5kIHRha2UgbG9uZ2VyLlxuICAgICAgICBmb3IgKGsgPSAwOyBrIDwgODsgaysrKSB7XG4gICAgICAgICAgICBhcHBseW1hc2soayk7ICAgICAgLy8gcmV0dXJucyBibGFjay13aGl0ZSBpbWJhbGFuY2VcbiAgICAgICAgICAgIHggPSBiYWRjaGVjaygpO1xuICAgICAgICAgICAgaWYgKHggPCB5KSB7IC8vIGN1cnJlbnQgbWFzayBiZXR0ZXIgdGhhbiBwcmV2aW91cyBiZXN0P1xuICAgICAgICAgICAgICAgIHkgPSB4O1xuICAgICAgICAgICAgICAgIHQgPSBrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHQgPT0gNylcbiAgICAgICAgICAgICAgICBicmVhazsgICAgICAgLy8gZG9uJ3QgaW5jcmVtZW50IGkgdG8gYSB2b2lkIHJlZG9pbmcgbWFza1xuICAgICAgICAgICAgcXJmcmFtZSA9IHN0cmluYnVmLnNsaWNlKDApOyAvLyByZXNldCBmb3IgbmV4dCBwYXNzXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHQgIT0gaykgICAgICAgICAvLyByZWRvIGJlc3QgbWFzayAtIG5vbmUgZ29vZCBlbm91Z2gsIGxhc3Qgd2Fzbid0IHRcbiAgICAgICAgICAgIGFwcGx5bWFzayh0KTtcblxuICAgIC8vIGFkZCBpbiBmaW5hbCBtYXNrL2VjY2xldmVsIGJ5dGVzXG4gICAgICAgIHkgPSBmbXR3b3JkW3QgKyAoKGVjY2xldmVsIC0gMSkgPDwgMyldO1xuICAgICAgICAvLyBsb3cgYnl0ZVxuICAgICAgICBmb3IgKGsgPSAwOyBrIDwgODsgaysrLCB5ID4+PSAxKVxuICAgICAgICAgICAgaWYgKHkgJiAxKSB7XG4gICAgICAgICAgICAgICAgcXJmcmFtZVsod2lkdGggLSAxIC0gaykgKyB3aWR0aCAqIDhdID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoayA8IDYpXG4gICAgICAgICAgICAgICAgICAgIHFyZnJhbWVbOCArIHdpZHRoICoga10gPSAxO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcXJmcmFtZVs4ICsgd2lkdGggKiAoayArIDEpXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIC8vIGhpZ2ggYnl0ZVxuICAgICAgICBmb3IgKGsgPSAwOyBrIDwgNzsgaysrLCB5ID4+PSAxKVxuICAgICAgICAgICAgaWYgKHkgJiAxKSB7XG4gICAgICAgICAgICAgICAgcXJmcmFtZVs4ICsgd2lkdGggKiAod2lkdGggLSA3ICsgayldID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoaylcbiAgICAgICAgICAgICAgICAgICAgcXJmcmFtZVsoNiAtIGspICsgd2lkdGggKiA4XSA9IDE7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBxcmZyYW1lWzcgKyB3aWR0aCAqIDhdID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgIC8vIHJldHVybiBpbWFnZVxuICAgICAgICByZXR1cm4gcXJmcmFtZTtcbiAgICB9XG5cbiAgICB2YXIgX2NhbnZhcyA9IG51bGwsXG4gICAgICAgIF9zaXplID0gbnVsbDtcblxuICAgIHZhciBhcGkgPSB7XG5cbiAgICAgICAgZ2V0IGVjY2xldmVsICgpIHtcbiAgICAgICAgICAgIHJldHVybiBlY2NsZXZlbDtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgZWNjbGV2ZWwgKHZhbCkge1xuICAgICAgICAgICAgZWNjbGV2ZWwgPSB2YWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IHNpemUgKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9zaXplO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBzaXplICh2YWwpIHtcbiAgICAgICAgICAgIF9zaXplID0gdmFsXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGNhbnZhcyAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NhbnZhcztcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgY2FudmFzIChlbCkge1xuICAgICAgICAgICAgX2NhbnZhcyA9IGVsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldEZyYW1lOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZnJhbWUoc3RyaW5nKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkcmF3OiBmdW5jdGlvbiAoc3RyaW5nLCBjYW52YXMsIHNpemUsIGVjYykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBlY2NsZXZlbCA9IGVjYyB8fCBlY2NsZXZlbDtcbiAgICAgICAgICAgIGNhbnZhcyA9IGNhbnZhcyB8fCBfY2FudmFzO1xuXG4gICAgICAgICAgICBpZiAoIWNhbnZhcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTm8gY2FudmFzIHByb3ZpZGVkIHRvIGRyYXcgUVIgY29kZSBpbiEnKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2l6ZSA9IHNpemUgfHwgX3NpemUgfHwgTWF0aC5taW4oY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgdmFyIGZyYW1lID0gZ2VuZnJhbWUoc3RyaW5nKSxcbiAgICAgICAgICAgICAgICBjdHggPSBjYW52YXMuY3R4LFxuICAgICAgICAgICAgICAgIHB4ID0gTWF0aC5yb3VuZChzaXplIC8gd2lkdGgpO1xuXG4gICAgICAgICAgICB2YXIgcm91bmRlZFNpemUgPSBweCAqIHdpZHRoLFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IE1hdGguZmxvb3IoKHNpemUgLSByb3VuZGVkU2l6ZSkgLyAyKTtcblxuICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnIzAwMDAwMCcpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHdpZHRoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyYW1lW2ogKiB3aWR0aCArIGldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QocHggKiBpICsgb2Zmc2V0LCBweCAqIGogKyBvZmZzZXQsIHB4LCBweCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHguZHJhdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgICAgIGFwaTogYXBpXG4gICAgfVxuXG59KSgpIl19