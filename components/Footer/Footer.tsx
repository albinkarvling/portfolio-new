"use client";
import {LINKS} from "@/assets/links";
import {renderIcon} from "@/utils/renderIcon";
import {Tooltip} from "../Tooltip";

export function Footer() {
    return (
        <footer className="py-8 bg-background-tertiary">
            <div className="main-width flex items-center justify-between">
                <nav>
                    <ul className="flex gap-6">
                        {LINKS.map((link) => (
                            <li key={link.text}>
                                <Tooltip text={link.text} color="quaternary">
                                    <a
                                        className="text-3xl sm:text-5xl"
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`View ${link.text}`}
                                    >
                                        {renderIcon(link.text)}
                                    </a>
                                </Tooltip>
                            </li>
                        ))}
                    </ul>
                </nav>
                <span>created by Albin Kärvling</span>
            </div>
        </footer>
    );
}
