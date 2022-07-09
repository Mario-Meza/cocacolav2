/*!
 * Copyright (c) The Free MRE Foundation. All rights reserved.
 * Licensed under the MIT License.
 */

import { DegreesToRadians, Quaternion, ScaledTransform, ScaledTransformLike } from "@microsoft/mixed-reality-extension-sdk";
import fetch from "node-fetch";

export function translate(transformLike: Partial<ScaledTransformLike>) {
        const pos = transformLike.position ? transformLike.position : { x: 0, y: 0, z: 0 };
        const rot = transformLike.rotation ? transformLike.rotation : { x: 0, y: 0, z: 0 };
        const scale = transformLike.scale ? transformLike.scale : { x: 3.0, y: 3.0, z: 3.0 };
        const transform = new ScaledTransform();
        transform.copy({
                position: pos,
                rotation: Quaternion.FromEulerAngles(
                        rot.x * DegreesToRadians,
                        rot.y * DegreesToRadians,
                        rot.z * DegreesToRadians
                ),
                scale,
        });
        return transform;
}

export async function fetchJSON(url: string) {
        const res = await fetch(url);
        const text = await res.text();
        return JSON.parse(text);
}